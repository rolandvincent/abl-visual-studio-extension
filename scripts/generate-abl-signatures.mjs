import fs from 'node:fs/promises';

const baseUrl = 'https://docs.progress.com';
const indexUrl = `${baseUrl}/bundle/abl-reference/page/ABL-Syntax-Reference.html`;

function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x2F;/g, '/')
    .trim();
}

function extractTopicHtml(html) {
  const marker = '"topic_html":"';
  const start = html.indexOf(marker);

  if (start < 0) {
    return '';
  }

  let value = '';
  let escaped = false;

  for (let index = start + marker.length; index < html.length; index += 1) {
    const char = html[index];

    if (escaped) {
      value += `\\${char}`;
      escaped = false;
      continue;
    }

    if (char === '\\') {
      escaped = true;
      continue;
    }

    if (char === '"') {
      break;
    }

    value += char;
  }

  return JSON.parse(`"${value.replace(/[\u0000-\u001f]/g, ' ')}"`);
}

function extractMetaDescription(html) {
  const match = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  return match ? decodeHtml(match[1]).replace(/\s+/g, ' ') : undefined;
}

function extractSyntaxSection(topicHtml) {
  const syntaxHeading = topicHtml.match(/<h2[^>]*>\s*Syntax\s*<\/h2>/i);

  if (!syntaxHeading) {
    return '';
  }

  const sectionStart = topicHtml.lastIndexOf('<section', syntaxHeading.index ?? 0);
  const nextSection = topicHtml.indexOf('<section', (syntaxHeading.index ?? 0) + syntaxHeading[0].length);

  return topicHtml.slice(sectionStart >= 0 ? sectionStart : syntaxHeading.index, nextSection >= 0 ? nextSection : undefined);
}

function cleanCodeBlock(block) {
  return decodeHtml(block)
    .replace(/\s+/g, ' ')
    .replace(/\s+([,)\]])/g, '$1')
    .replace(/([([])\s+/g, '$1')
    .replace(/\[\s*,/g, '[,')
    .trim();
}

function extractSyntaxLabels(topicHtml) {
  const syntaxSection = extractSyntaxSection(topicHtml);
  const labels = [...syntaxSection.matchAll(/<pre[^>]*>\s*<code>([\s\S]*?)<\/code>\s*<\/pre>/gi)]
    .map((match) => cleanCodeBlock(match[1]))
    .filter((label) => /^[A-Z][A-Z0-9-]*\b/i.test(label));

  return [...new Set(labels)];
}

function extractParameters(label) {
  const parenStart = label.indexOf('(');
  const parenEnd = label.lastIndexOf(')');

  if (parenStart < 0 || parenEnd <= parenStart) {
    return [];
  }

  return [...label.slice(parenStart + 1, parenEnd).matchAll(/[A-Za-z_][A-Za-z0-9_-]*/g)]
    .map((match) => match[0])
    .filter((value) => !/^(or|and|to|then|else)$/i.test(value));
}

function functionKeyFromTitle(title) {
  return title.replace(/\s+function$/i, '').trim().toLowerCase();
}

async function fetchText(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function main() {
  const indexHtml = await fetchText(indexUrl);
  const functions = [...indexHtml.matchAll(/<a[^>]+href="(\/bundle\/abl-reference\/page\/[^"]+)"[^>]*>(.*?)<\/a>/g)]
    .map((match) => ({
      url: `${baseUrl}${match[1]}`,
      title: decodeHtml(match[2])
    }))
    .filter((entry) => /\sfunction$/i.test(entry.title));

  const uniqueFunctions = [...new Map(functions.map((entry) => [entry.title, entry])).values()];
  const signatures = {};

  let nextIndex = 0;

  async function processEntry(entry, index) {
    const key = functionKeyFromTitle(entry.title);

    try {
      const html = await fetchText(entry.url);
      const labels = extractSyntaxLabels(extractTopicHtml(html));
      const description = extractMetaDescription(html);

      if (labels.length === 0) {
        return;
      }

      signatures[key] = labels.map((label) => ({
        label,
        documentation: description,
        parameters: extractParameters(label)
      }));
    } catch (error) {
      console.warn(`Skipping ${entry.title}: ${error instanceof Error ? error.message : String(error)}`);
    }

    if ((index + 1) % 25 === 0) {
      console.log(`Processed ${index + 1}/${uniqueFunctions.length}`);
    }
  }

  async function worker() {
    while (nextIndex < uniqueFunctions.length) {
      const index = nextIndex;
      nextIndex += 1;
      await processEntry(uniqueFunctions[index], index);
    }
  }

  await Promise.all(Array.from({ length: 8 }, () => worker()));

  const output = [
    '// Generated from Progress ABL function reference pages.',
    '// Source index: https://docs.progress.com/bundle/abl-reference/page/ABL-Syntax-Reference.html',
    '',
    'export type AblSignatureDefinition = {',
    '  label: string;',
    '  documentation?: string;',
    '  parameters: string[];',
    '};',
    '',
    `export const builtInSignatures: Record<string, AblSignatureDefinition[]> = ${JSON.stringify(signatures, null, 2)};`,
    ''
  ];

  await fs.writeFile('src/ablSignatures.ts', output.join('\n'));
  console.log(`Generated signatures for ${Object.keys(signatures).length}/${uniqueFunctions.length} functions.`);
}

await main();
