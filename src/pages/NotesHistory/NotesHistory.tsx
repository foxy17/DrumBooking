import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ChevronLeft, Music, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { noteHistoryItem } from '@/types/notesHistory';
import TimelineItem from './components/TimelineItem';
import { useEffect, useState } from 'react';

export const historyData: noteHistoryItem[] = [
  {
    id: '1',
    date: '04 March 2024',
    content:
      'Est ex elit ea ea Lorem ea consectetur qui cillum nostrud officia ipsum magna est fugiat cillum adipisicing do. Dolor ut mollit occaecat re',
    type: 'note',
  },
  {
    id: '2',
    date: '27 February 2024',
    content: 'Music Writing - The Tool',
    type: 'writing',
  },
  {
    id: '3',
    date: '21 February 2024',
    content:
      'Est ex elit ea ea Lorem ea consectetur qui cillum nostrud officia ipsum magna est fugiat cillum',
    type: 'note',
  },
  {
    id: '4',
    date: '15 February 2024',
    content:
      'Est ex elit ea ea Lorem ea consectetur qui cillum nostrud officia ipsum magna est fugiat cillum',
    type: 'note',
  },
  {
    id: '9',
    date: '04 March 2024',
    content:
      'Est ex elit ea ea Lorem ea consectetur qui cillum nostrud officia ipsum magna est fugiat cillum adipisicing do. Dolor ut mollit occaecat re',
    type: 'note',
  },
  {
    id: '8',
    date: '04 March 2024',
    content:
      'Est ex elit ea ea Lorem ea consectetur qui cillum nostrud officia ipsum magna est fugiat cillum adipisicing do. Dolor ut mollit occaecat re',
    type: 'note',
  },
  {
    id: '5',
    date: '27 February 2024',
    content: 'Music Writing - The Tool',
    type: 'writing',
  },
  {
    id: '6',
    date: '21 February 2024',
    content:
      'Est ex elit ea ea Lorem ea consectetur qui cillum nostrud officia ipsum magna est fugiat cillum',
    type: 'note',
  },
];

export default function NotesHistory() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-black p-4">
      {/* Header */}
      <header className="flex items-center mb-4 md:gap-4">
        <Button
          variant="secondary"
          className="bg-transparent hover:bg-zinc-800 rounded-full h-10 w-10 text-indigo-400 hover:text-indigo-400/80 p-0 mr-2"
        >
          <ChevronLeft className="h-8 w-8 md:h-12 md:w-12" />
        </Button>
        <h2 className="text-xl font-bold md:text-2xl tracking-tight">
          History - Brandon Taylor
        </h2>
      </header>
      {/* Timeline */}
      {isMobile ? (
        <div className="relative top-4 pb-8 ">
          <div className="space-y-4">
            {historyData.map((item) => (
              <TimelineItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-[90%] max-w-4xl pb-8 pt-4">
          {/* Timeline section */}
          {historyData.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
