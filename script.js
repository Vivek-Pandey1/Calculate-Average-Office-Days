document.addEventListener("DOMContentLoaded", function () {
    var officeDaysInput = document.getElementById("office-days");
    var remoteDaysInput = document.getElementById("remote-days");
    var approvedTimeOffInput = document.getElementById("approved-time-off");
    var calculateBtn = document.getElementById("calculate-btn");
    var resultDiv = document.getElementById('result');

    function calculateAverageOfficeDays(
        officeDays,
        homeWorkingDays,
        approvedTimeOff
    ) {
        var totalWorkingDays = officeDays + homeWorkingDays + approvedTimeOff;
        let diff = 0;
        let getdays = totalWorkingDays / 5;

        function getAvg() {
            if (approvedTimeOff >= 1 && approvedTimeOff < 5) {
                diff = diff + approvedTimeOff / 5;
            } else if (approvedTimeOff > 5) {
                approvedTimeOff = approvedTimeOff - 5;
                getdays = getdays - 1;
                getAvg(approvedTimeOff);
            }
            return getdays - diff;
        }
        // Calculate total office days by subtracting home working days, holidays, approved time off, and missing days
        var totalOfficeDays = officeDays;

        // Calculate total number of weeks (assuming 5 working days per week)
        var weeks = getAvg();

        // Calculate average office days per week
        let averageOfficeDaysWeekly = totalOfficeDays / weeks;
        getAvg(approvedTimeOff);
        console.log("diff", diff);

        return averageOfficeDaysWeekly || 0;
    }

    calculateBtn.addEventListener("click", function () {
        var officeDays = parseInt(officeDaysInput.value) || 0;
        var remoteDays = parseInt(remoteDaysInput.value) || 0;
        var approvedTimeOff = parseInt(approvedTimeOffInput.value) || 0;

        // Call the calculate function with the input values
        var averageOfficeDays = calculateAverageOfficeDays(
            officeDays,
            remoteDays,
            approvedTimeOff
        );
        resultDiv.textContent = "Average office days per week: " + averageOfficeDays.toFixed(2);
    });
});
