import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WordPullUpProps {
  lines: string[];
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
}

export default function WordPullUp({
  lines,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
}: WordPullUpProps) {
  return (
    <motion.div
      variants={wrapperFramerProps}
      initial="hidden"
      animate="show"
      className={cn(
        'font-display text-left text-4xl font-bold tracking-[-0.02em] drop-shadow-sm',
        className,
      )}
    >
      {lines.map((line, lineIndex) => (
        <motion.div key={lineIndex} className="mb-0 last:mb-0">
          {line.split(' ').map((word, wordIndex) => (
            <motion.span
              key={`${lineIndex}-${wordIndex}`}
              variants={framerProps}
              className="inline-block pr-2 leading-6"
            >
              {word === '' ? <span>&nbsp;</span> : word}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
}
