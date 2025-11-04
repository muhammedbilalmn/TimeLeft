 // Function to update the DOM elements with the calculated values
      function updateUI({ days, hours, minutes, seconds, yearProgress, nextYear }) {
        const nextYearEl = document.getElementById('next-year');
        const daysLeftEl = document.getElementById('days-left');
        const hoursLeftEl = document.getElementById('hours-left');
        const minutesLeftEl = document.getElementById('minutes-left');
        const secondsLeftEl = document.getElementById('seconds-left');
        const progressTextEl = document.getElementById('progress-text');
        const progressCircleEl = document.getElementById('progress-circle');

        if (!nextYearEl || !daysLeftEl || !hoursLeftEl || !minutesLeftEl || !secondsLeftEl || !progressTextEl || !progressCircleEl) {
          console.error("One or more UI elements not found.");
          return;
        }
        
        // Helper to format numbers with a leading zero
        const formatTime = (time) => String(time).padStart(2, '0');

        // Update text content
        nextYearEl.textContent = nextYear;
        daysLeftEl.textContent = days;
        hoursLeftEl.textContent = formatTime(hours);
        minutesLeftEl.textContent = formatTime(minutes);
        secondsLeftEl.textContent = formatTime(seconds);
        progressTextEl.textContent = `${yearProgress.toFixed(1)}%`;

        // Update progress circle
        const radius = progressCircleEl.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (yearProgress / 100) * circumference;
        progressCircleEl.style.strokeDashoffset = offset;
      }

      // Function to calculate the time remaining and year progress
      function calculateAndRender() {
          const now = new Date();
          const currentYear = now.getFullYear();
          const nextYearDate = new Date(currentYear + 1, 0, 1);

          const diffTime = nextYearDate.getTime() - now.getTime();

          // Calculate time components
          const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

          // Calculate year progress percentage.
          const startOfYear = new Date(currentYear, 0, 1);
          const totalTimeInYear = nextYearDate.getTime() - startOfYear.getTime();
          const timePassed = now.getTime() - startOfYear.getTime();
          const progress = (timePassed / totalTimeInYear) * 100;

          // Call the UI update function with the new values
          updateUI({
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            yearProgress: progress,
            nextYear: currentYear + 1,
          });
      }

      // Main execution function
      function main() {
          calculateAndRender();
          // Update the countdown every second for a live timer.
          setInterval(calculateAndRender, 1000);
      }

      // Wait for the DOM to be fully loaded before running the script
      if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', main);
      } else {
          main();
      }