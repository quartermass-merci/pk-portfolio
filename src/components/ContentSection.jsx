import React, { useState, useMemo } from 'react';
import AnimatedLink from './AnimatedLink';

/* ─── Image Grid (same as the one in App.jsx) ─── */
function ImageGrid({ urls }) {
  const [zoomImg, setZoomImg] = useState(null);
  if (!urls || !urls.length) return null;
  return (
    <>
      <div className="columns-2 md:columns-3 gap-3 my-10">
        {urls.map((u, i) => (
          <img
            key={i}
            src={u}
            alt=""
            className="w-full mb-3 rounded-md md:grayscale md:hover:grayscale-0 transition-all duration-500 break-inside-avoid cursor-pointer"
            loading="lazy"
            onClick={() => setZoomImg(u)}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ))}
      </div>
      {zoomImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setZoomImg(null)}
        >
          <img src={zoomImg} alt="" className="max-w-full max-h-[90vh] rounded-lg object-contain" />
        </div>
      )}
    </>
  );
}

/* ─── Frontmatter parser ─── */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  match[1].split('\n').forEach(line => {
    const m = line.match(/^(\w+):\s*"?(.*?)"?\s*$/);
    if (m) meta[m[1]] = m[2];
  });
  return { meta, body: match[2] };
}

/* ─── Inline renderer — handles **bold**, *italic*, [text](url) ─── */
function renderInline(text) {
  if (!text) return null;
  const tokens = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Link: [text](url)
    const linkMatch = remaining.match(/^([\s\S]*?)\[([^\]]+)\]\(([^)]+)\)/);
    // Bold: **text**
    const boldMatch = remaining.match(/^([\s\S]*?)\*\*(.+?)\*\*/);
    // Italic: *text* (but not **)
    const italicMatch = remaining.match(/^([\s\S]*?)(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);

    // Find the earliest match
    const candidates = [
      linkMatch && { type: 'link', index: linkMatch[1].length, match: linkMatch },
      boldMatch && { type: 'bold', index: boldMatch[1].length, match: boldMatch },
      italicMatch && { type: 'italic', index: italicMatch[1].length, match: italicMatch },
    ].filter(Boolean);

    if (candidates.length === 0) {
      tokens.push(<span key={key++}>{remaining}</span>);
      break;
    }

    candidates.sort((a, b) => a.index - b.index);
    const winner = candidates[0];

    if (winner.type === 'link') {
      const [full, before, linkText, url] = winner.match;
      if (before) tokens.push(<span key={key++}>{before}</span>);
      tokens.push(
        <AnimatedLink key={key++} href={url} target="_blank" rel="noreferrer" variant="center">
          {linkText}
        </AnimatedLink>
      );
      remaining = remaining.slice(full.length);
    } else if (winner.type === 'bold') {
      const [full, before, boldText] = winner.match;
      if (before) tokens.push(<span key={key++}>{before}</span>);
      tokens.push(<strong key={key++}>{renderInline(boldText)}</strong>);
      remaining = remaining.slice(full.length);
    } else if (winner.type === 'italic') {
      const [full, before, italicText] = winner.match;
      if (before) tokens.push(<span key={key++}>{before}</span>);
      tokens.push(<em key={key++}>{italicText}</em>);
      remaining = remaining.slice(full.length);
    }
  }
  return tokens.length === 1 ? tokens[0] : tokens;
}

/* ─── Block parser ─── */
function parseBlocks(body) {
  const lines = body.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip blank lines
    if (line.trim() === '') { i++; continue; }

    // Custom block: :::type
    if (line.trim().startsWith(':::')) {
      const typeMatch = line.trim().match(/^:::(\w+)$/);
      if (typeMatch) {
        const blockType = typeMatch[1];
        const content = [];
        i++;
        while (i < lines.length && lines[i].trim() !== ':::') {
          content.push(lines[i]);
          i++;
        }
        i++; // skip closing :::
        blocks.push({ type: blockType, content: content.join('\n').trim() });
        continue;
      }
    }

    // Heading: ## or ### or #### or #####
    if (line.match(/^#{2,5}\s/)) {
      const hMatch = line.match(/^(#{2,5})\s+(.+)$/);
      if (hMatch) {
        const level = hMatch[1].length;
        const text = hMatch[2];
        blocks.push({ type: 'heading', level, text });
        i++;
        continue;
      }
    }

    // Blockquote: > text
    if (line.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ type: 'blockquote', text: quoteLines.join('\n') });
      continue;
    }

    // Unordered list: - item
    if (line.match(/^[-*]\s/)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    // Horizontal rule: --- or ***
    if (line.match(/^(-{3,}|\*{3,})$/)) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // Paragraph: collect lines until blank
    {
      const paraLines = [];
      while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('#') && !lines[i].startsWith('> ') && !lines[i].startsWith(':::') && !lines[i].match(/^[-*]\s/) && !lines[i].match(/^(-{3,}|\*{3,})$/)) {
        paraLines.push(lines[i]);
        i++;
      }
      if (paraLines.length > 0) {
        blocks.push({ type: 'paragraph', text: paraLines.join('\n') });
      }
    }
  }

  return blocks;
}

/* ─── Block renderer ─── */
function renderBlock(block, index) {
  switch (block.type) {
    case 'heading': {
      const Tag = `h${block.level}`;
      // Timeline entry: ### Title | Date  OR  ### Title | Date | logo_path
      if (block.level === 3 && block.text.includes(' | ')) {
        const parts = block.text.split(' | ');
        const title = parts[0];
        const date = parts[1];
        const logo = parts[2]?.trim();
        return (
          <div key={index} className="flex items-center gap-3 border-b border-[#C4B99A] mb-2 pb-1 font-bold mt-8 first:mt-0">
            {logo && (
              <img
                src={logo}
                alt=""
                className="h-6 w-6 object-contain flex-shrink-0 opacity-60"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <span className="flex-1">{title}</span>
            <span className="flex-shrink-0">{date}</span>
          </div>
        );
      }
      if (block.level === 4) {
        return <h4 key={index} className="font-bold border-b border-[#C4B99A] pb-1 mb-3 mt-8">{renderInline(block.text)}</h4>;
      }
      if (block.level === 5) {
        return <p key={index} className="font-bold uppercase tracking-widest text-sm md:text-xs mb-2 mt-4">{renderInline(block.text)}</p>;
      }
      return <Tag key={index} className="font-bold mb-2">{renderInline(block.text)}</Tag>;
    }

    case 'paragraph':
      return <p key={index} className="mb-4">{renderInline(block.text)}</p>;

    case 'list':
      return (
        <ul key={index} className="list-disc pl-5 space-y-2 mb-4">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );

    case 'blockquote':
      return (
        <div key={index} className="mb-6 pl-4 border-l-2 border-[#C4B99A]">
          <p className="italic">{block.text}</p>
        </div>
      );

    case 'hr':
      return <hr key={index} className="border-[#C4B99A] my-8" />;

    case 'images': {
      const urls = block.content.split('\n').map(u => u.trim()).filter(Boolean);
      return <ImageGrid key={index} urls={urls} />;
    }

    case 'video':
      return (
        <div key={index} className="aspect-video w-full mb-10 bg-black overflow-hidden rounded">
          <video
            src={block.content}
            className="w-full h-full object-contain"
            controls
            playsInline
            preload="metadata"
          />
        </div>
      );

    case 'embed': {
      const srcMatch = block.content.match(/src=(.+)/);
      const titleMatch = block.content.match(/title=(.+)/);
      const src = srcMatch ? srcMatch[1].trim() : '';
      const title = titleMatch ? titleMatch[1].trim() : '';
      return (
        <div key={index} className="aspect-video w-full my-6 bg-[#F0EDE7] overflow-hidden rounded">
          <iframe
            src={src}
            className="w-full h-full border-0"
            allowFullScreen
            title={title}
          />
        </div>
      );
    }

    case 'youtube': {
      const lines = block.content.split('\n');
      const idMatch = lines.find(l => l.startsWith('id='));
      const titleMatch = lines.find(l => l.startsWith('title='));
      const videoId = idMatch ? idMatch.replace('id=', '').trim() : '';
      const title = titleMatch ? titleMatch.replace('title=', '').trim() : '';
      if (!videoId) return null;
      return (
        <div key={index} className="my-6">
          {title && <p className="text-xs uppercase tracking-widest text-[#6B5D52] mb-2 font-ui">{title}</p>}
          <div className="aspect-video w-full bg-black overflow-hidden rounded">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title || 'YouTube video'}
            />
          </div>
        </div>
      );
    }

    case 'imagegroup': {
      const lines = block.content.split('\n');
      const labelLine = lines.find(l => l.startsWith('label='));
      const label = labelLine ? labelLine.replace('label=', '').trim() : '';
      const urls = lines.filter(l => !l.startsWith('label=') && l.trim()).map(u => u.trim());
      if (!urls.length) return null;
      return (
        <div key={index} className="mb-2">
          {label && <h4 className="font-bold text-sm uppercase tracking-widest text-[#6B5D52] mb-3 mt-8">{label}</h4>}
          <ImageGrid urls={urls} />
        </div>
      );
    }

    case 'testimonial': {
      const lines = block.content.split('\n');
      const nameMatch = lines[0]?.match(/^\*\*(.+)\*\*$/);
      const name = nameMatch ? nameMatch[1] : lines[0];
      const quote = lines.slice(1).join('\n').trim();
      return (
        <div key={index} className="mb-8">
          <p className="font-bold mb-2">{name}</p>
          <p>{quote}</p>
        </div>
      );
    }

    default:
      return null;
  }
}

/* ─── Main component ─── */
export default function ContentSection({ content }) {
  const parsed = useMemo(() => {
    if (!content) return null;
    const { meta, body } = parseFrontmatter(content);
    const blocks = parseBlocks(body);
    return { meta, blocks };
  }, [content]);

  if (!parsed) return null;
  const { meta, blocks } = parsed;

  return (
    <div className="max-w-2xl font-mono text-sm leading-relaxed pb-20">
      {meta.logo && (
        <div className="mb-6">
          <img
            src={meta.logo}
            alt=""
            className="h-12 w-auto object-contain"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )}
      {meta.title && (
        <h2 className="text-2xl mb-2 font-bold uppercase tracking-widest font-display">{meta.title}</h2>
      )}
      {meta.subtitle && (
        <h3 className="font-bold uppercase tracking-widest text-sm md:text-xs mb-8 text-[#6B5D52]">{meta.subtitle}</h3>
      )}
      {!meta.subtitle && meta.title && <div className="mb-6" />}
      <div className="space-y-0">
        {blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </div>
  );
}
