import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Music, PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type noteHistoryItem } from '@/types/notesHistory';

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
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="group gap-4 flex relative md:grid md:grid-cols-[25%_75%] md:py-4">
      {isMobile ? (
        <div className="absolute left-5 top-0 -bottom-4 w-px bg-white group-last:hidden" />
      ) : (
        <div className="text-indigo-300 font-bold tracking-tight text-right pr-4">
          {item.date}
        </div>
      )}

      <div className="relative flex z-10">
        {!isMobile && (
          <div className="absolute left-5 top-0 -bottom-8 w-px bg-white group-last:hidden" />
        )}
        <div className="bg-white rounded-full flex items-center justify-center w-10 h-10 md:absolute md:left-0 md:p-2">
          {item.type === 'note' ? (
            <Music className="w-4 h-4 text-black md:w-6 md:h-6" />
          ) : (
            <PenLine className="w-4 h-4 text-black md:w-6 md:h-6" />
          )}
        </div>

        <div
          className={cn(
            'prose prose-invert max-w-none text-zinc-200',
            'flex-1 px-4 pb-2 md:p-4 md:rounded-lg md:border md:border-zinc-600 md:group-hover:border-indigo-500 md:transition-colors md:ml-16'
          )}
        >
          <p className="text-indigo-300 font-bold tracking-tight mb-2 md:hidden">
            {item.date}
          </p>
          <ReactMarkdown>
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
