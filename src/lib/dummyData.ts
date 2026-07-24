import type { CellData, CellType } from "./types";

const sampleTexts = [
  "Great idea!",
  "Need to research",
  "Weekend project",
  "Game changer",
  "Must watch",
  "Try this",
  "Bookmarked",
  "Inspiration",
  "Dream big",
  "Start today",
  "Keep learning",
  "Ship fast",
  "Stay curious",
  "Build in public",
  "Less is more",
];

const sampleLinks = [
  "https://github.com/vercel/next.js",
  "https://supabase.com/docs",
  "https://react.dev",
  "https://tailwindcss.com",
  "https://www.typescriptlang.org",
  "https://developer.mozilla.org",
  "https://stackoverflow.com",
  "https://news.ycombinator.com",
  "https://producthunt.com",
  "https://dev.to",
];

const sampleImages = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=200",
];

const sampleYTvideos = [
  "https://youtu.be/dQw4w9WgXcQ",
  "https://youtu.be/jNQXAC9IVRw",
  "https://youtu.be/9bZkp7q19f0",
  "https://youtube.com/shorts/abc123",
];

const sampleIG = [
  "https://instagram.com/reel/Cx8x8x8x8x8/",
  "https://instagram.com/reel/Dx9x9x9x9x9/",
  "https://instagram.com/creatoreconomy",
  "https://instagram.com/designinspo",
];

const sampleTwitter = [
  "https://twitter.com/rauchg/status/123456789",
  "https://twitter.com/supabase/status/987654321",
  "https://twitter.com/nextjs/status/456789123",
];

const samplePinterest = [
  "https://pinterest.com/pin/123456789/",
  "https://pinterest.com/designideas/board/",
  "https://pinterest.com/pin/987654321/",
];

const sampleInputs = [
  "Type something...",
  "Add your note here",
  "What's on your mind?",
  "Idea: ",
  "TODO: ",
];

export function generateDummyCell(type: CellType, index: number): CellData {
  const id = `cell-${index}-${Date.now()}`;

  switch (type) {
    case "text":
      return { id, type, value: sampleTexts[index % sampleTexts.length] };

    case "link":
      return {
        id,
        type,
        value: sampleLinks[index % sampleLinks.length],
        label: `Link ${index + 1}`,
      };

    case "counter":
      return { id, type, value: "", count: Math.floor(Math.random() * 100) };

    case "checkbox":
      return { id, type, value: "", checked: Math.random() > 0.5 };

    case "image":
      return {
        id,
        type,
        value: sampleImages[index % sampleImages.length],
        label: `Image ${index + 1}`,
      };

    case "youtube":
    case "youtube-short":
      return {
        id,
        type,
        value: sampleYTvideos[index % sampleYTvideos.length],
        label: `Video ${index + 1}`,
      };

    case "instagram-reel":
    case "instagram-profile":
      return {
        id,
        type,
        value: sampleIG[index % sampleIG.length],
        label: `IG ${index + 1}`,
      };

    case "twitter":
      return {
        id,
        type,
        value: sampleTwitter[index % sampleTwitter.length],
        label: `Tweet ${index + 1}`,
      };

    case "pinterest":
      return {
        id,
        type,
        value: samplePinterest[index % samplePinterest.length],
        label: `Pin ${index + 1}`,
      };

    case "video":
      return {
        id,
        type,
        value: sampleYTvideos[index % sampleYTvideos.length],
        label: `Clip ${index + 1}`,
      };

    case "input":
      return { id, type, value: sampleInputs[index % sampleInputs.length] };

    default:
      return { id, type: "text", value: "Empty" };
  }
}
