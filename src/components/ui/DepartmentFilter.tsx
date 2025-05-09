
import { useState } from "react";
import { Check, ChevronDown, Filter } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { departments } from "@/lib/data";

interface DepartmentFilterProps {
  selectedDepartment: string | null;
  onSelectDepartment: (department: string | null) => void;
}

const DepartmentFilter = ({ selectedDepartment, onSelectDepartment }: DepartmentFilterProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string) => {
    // Toggle selection if already selected
    onSelectDepartment(currentValue === selectedDepartment ? null : currentValue);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedDepartment
              ? departments.find((dept) => dept.name === selectedDepartment)?.name
              : "Nach Department filtern"}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Department suchen..." />
            <CommandEmpty>Kein Department gefunden.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="all"
                value="all"
                onSelect={() => {
                  onSelectDepartment(null);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedDepartment === null ? "opacity-100" : "opacity-0"
                  )}
                />
                Alle Departments
              </CommandItem>
              {departments.map((dept) => (
                <CommandItem
                  key={dept.id}
                  value={dept.name}
                  onSelect={() => handleSelect(dept.name)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedDepartment === dept.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {dept.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DepartmentFilter;
