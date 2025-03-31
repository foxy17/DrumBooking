import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

type Filters = {
  dueWithin7Days: boolean;
  soloSession: boolean;
  duoSession: boolean;
};

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: boolean) => void;
  onClearAll: () => void;
  onApplyFilters: () => void;
}

export const FilterModal = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearAll,
  onApplyFilters,
}: FilterModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-zinc-900 rounded-xl p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Filters</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl mb-4">Due Date</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">
                Show Users with due date within next 7 days
              </span>
              <Switch
                checked={filters.dueWithin7Days}
                onCheckedChange={(checked: boolean) => {
                  onFilterChange('dueWithin7Days', checked);
                }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl mb-4">Class Type</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center space-x-2">
                <label htmlFor="solo">Solo Session</label>
                <Checkbox
                  id="solo"
                  checked={filters.soloSession}
                  onCheckedChange={checked => {
                    onFilterChange('soloSession', checked as boolean);
                  }}
                />
              </div>
              <div className="flex justify-between items-center space-x-2">
                <label htmlFor="duo">Duo Session</label>
                <Checkbox
                  id="duo"
                  checked={filters.duoSession}
                  onCheckedChange={checked => {
                    onFilterChange('duoSession', checked as boolean);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            onClick={onClearAll}
            className="text-gray-400 hover:text-white"
          >
            Clear all
          </Button>
          <Button onClick={onApplyFilters}>View Results</Button>
        </div>
      </div>
    </div>
  );
};
