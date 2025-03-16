"use client";

import "react-day-picker/dist/style.css";
import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={(range) => setRange(range)}
        selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        // hidden={true}
        endMonth={new Date(new Date().setMonth(new Date().getMonth() + 5))}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-center gap-4">
          {/* Price per night */}
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-bold">
                  ${regularPrice - discount}
                </span>
                <span className="line-through text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">${regularPrice}</span>
            )}
            <span className="text-lg text-primary-700">/night</span>
          </p>

          {/* Nights Multiplier */}
          {numNights > 0 && (
            <p className="bg-accent-600 px-3 py-2 text-xl font-semibold rounded-md">
              × {numNights}
            </p>
          )}

          {/* Total Price */}
          {numNights > 0 && (
            <p className="text-lg font-bold uppercase">
              Total:{" "}
              <span className="text-2xl font-semibold">${cabinPrice}</span>
            </p>
          )}
        </div>

        {/* Clear Button */}
        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold rounded-md"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
