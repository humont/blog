const categoryEmojis: Record<string, string> = {
  Dev: "🔧",
  Thoughts: "🧠",
  Blockchain: "🌐",
  Databases: "💾",
  Exercise: "🏋️",
  Project: "🗂",
  Pi: "👾",
  AI: "🤖",
  Politics: "🏛️",
  Authentication: "🔐",
  Wisdom: "📜",
};

interface Props {
  category: string;
}

export function CategoryEmoji({ category }: Props) {
  const emoji = categoryEmojis[category];
  return emoji ? <span aria-hidden="true">{emoji} </span> : null;
}
