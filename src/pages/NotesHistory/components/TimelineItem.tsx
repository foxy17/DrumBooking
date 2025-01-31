import { cn } from '@/lib/utils';
import { noteHistoryItem } from '@/types/notesHistory';
import { Music, PenLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function TimelineItem({ item }: { item: noteHistoryItem }) {
  const [isExpanded, setIsExpanded] = useState(false); // State to track expanded/collapsed
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="flex gap-4 relative group">
        <div className="absolute left-6 top-0 -bottom-4 w-px bg-white group-last:hidden" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-white border border-zinc-800 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
            {item.type === 'note' ? (
              <Music className="w-5 h-5 text-black" />
            ) : (
              <PenLine className="w-5 h-5 text-black" />
            )}
          </div>
        </div>

        <div className="flex-1 pt-2">
          <p className="text-indigo-300 font-bold tracking-tight mb-2">
            {item.date}
          </p>
          <div className="space-y-2">
            <ReactMarkdown
              className={cn(
                'prose prose-invert max-w-none',
                'prose-p:my-0 prose-p:leading-relaxed',
                'text-zinc-200',
              )}
            >
              {isExpanded
                ? item.content
                : item.content.substring(0, 100) +
                  (item.content.length > 100 ? '...' : '')}
            </ReactMarkdown>
            {item.content.length > 100 && (
              <span
                className="text-rose-200 hover:text-rose-300 text-sm cursor-pointer"
                onClick={toggleExpand}
              >
                {isExpanded ? 'show less' : 'view more'}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-[25%_75%] gap-4 py-4 group">
        <div className="text-indigo-300 font-bold tracking-tight text-right pr-4">
          {item.date}
        </div>

        <div className="flex relative">
          <div className="absolute left-5 top-0 -bottom-8 w-px bg-white group-last:hidden" />
          <div className="absolute left-0 bg-white rounded-full p-2 border">
            {item.type === 'note' ? (
              <Music className="h-6 w-6 text-black" />
            ) : (
              <PenLine className="h-6 w-6 text-black" />
            )}
          </div>

          <div
            className={cn(
              'p-4 rounded-lg border border-zinc-600 group-hover:border-indigo-500 transition-colors ml-16',
            )}
          >
            <ReactMarkdown
              className={cn(
                'prose prose-invert max-w-none',
                'prose-p:my-0 prose-p:leading-relaxed',
                'text-zinc-200',
              )}
            >
              {isExpanded
                ? item.content
                : item.content.substring(0, 100) +
                  (item.content.length > 100 ? '...' : '')}
            </ReactMarkdown>
            {item.content.length > 100 && (
              <span
                className="text-rose-200 hover:text-rose-300 text-sm cursor-pointer"
                onClick={toggleExpand}
              >
                {isExpanded ? 'show less' : 'view more'}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
