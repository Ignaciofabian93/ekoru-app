import { Clock } from "lucide-react";
import { useState } from "react";
import Input from "@/ui/inputs/input";
import Checkbox from "@/ui/inputs/checkbox";
import {
  type BusinessHours,
  type DaySchedule,
  daysOfWeek,
  defaultBusinessHours,
  formatTimeInput,
  validateTimeRange,
  normalizeBusinessHours,
} from "@/utils/businessHoursUtils";

type Props = {
  value: BusinessHours | Record<string, unknown>;
  onChange: (hours: BusinessHours) => void;
};

export default function BusinessHoursInput({ value, onChange }: Props) {
  const [hours, setHours] = useState<BusinessHours>(normalizeBusinessHours(value || defaultBusinessHours));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTimeChange = (day: keyof BusinessHours, field: "open" | "close", rawValue: string) => {
    const formattedValue = formatTimeInput(rawValue);

    const updatedHours = {
      ...hours,
      [day]: {
        ...hours[day],
        [field]: formattedValue,
        isClosed: false, // Ensure isClosed is always set when editing times
      },
    };

    setHours(updatedHours);
    onChange(updatedHours);

    // Validate if both times are filled
    const daySchedule = updatedHours[day];
    if (!daySchedule.isClosed && daySchedule.open && daySchedule.close) {
      const validation = validateTimeRange(daySchedule.open, daySchedule.close);
      if (!validation.isValid) {
        setErrors({ ...errors, [day]: validation.error || "" });
      } else {
        const newErrors = { ...errors };
        delete newErrors[day];
        setErrors(newErrors);
      }
    }
  };

  const handleClosedToggle = (day: keyof BusinessHours, isClosed: boolean) => {
    const updatedHours = {
      ...hours,
      [day]: {
        open: isClosed ? "" : "09:00",
        close: isClosed ? "" : "18:00",
        isClosed,
      },
    };

    setHours(updatedHours);
    onChange(updatedHours);

    // Clear errors for this day if closed
    if (isClosed) {
      const newErrors = { ...errors };
      delete newErrors[day];
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 mb-2">Horarios de Atención</label>

      {daysOfWeek.map(({ key, label }) => {
        const daySchedule = hours[key as keyof BusinessHours] as DaySchedule;
        const hasError = errors[key];

        return (
          <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-24 flex-shrink-0">
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>

            <Checkbox
              id={`closed-${key}`}
              name={`closed-${key}`}
              label="Cerrado"
              checked={daySchedule?.isClosed || false}
              onChange={(checked) => handleClosedToggle(key as keyof BusinessHours, checked)}
            />

            {!daySchedule?.isClosed && (
              <>
                <div className="flex-1">
                  <Input
                    icon={Clock}
                    type="text"
                    value={daySchedule?.open || ""}
                    onChange={(e) =>
                      handleTimeChange(key as keyof BusinessHours, "open", (e.target as HTMLInputElement).value)
                    }
                    placeholder="09:00"
                    maxLength={5}
                    hasIcon={true}
                    errorMessage={hasError}
                  />
                </div>

                <span className="text-gray-500">-</span>

                <div className="flex-1">
                  <Input
                    icon={Clock}
                    type="text"
                    value={daySchedule?.close || ""}
                    onChange={(e) =>
                      handleTimeChange(key as keyof BusinessHours, "close", (e.target as HTMLInputElement).value)
                    }
                    placeholder="18:00"
                    maxLength={5}
                    hasIcon={true}
                    errorMessage={hasError}
                  />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
