// document.addEventListener('DOMContentLoaded', function () {
//     const usernameInput = document.getElementById("user-input");
//     const SearchButton = document.getElementById("search-btn");
//     const statscotainer = document.querySelector(".stats-container");
//     const easyProgressCircle = document.querySelector(".easy-progress");
//     const easylabel = document.getElementById("easy-label");
//     const mediumProgressCircle = document.querySelector(".Medium-progress");
//     const mediumlabel = document.getElementById("Medium-label");
//     const hardProgressCircle = document.querySelector(".Hard-progress");
//     const hardlabel = document.getElementById("Hard-label");
//     const cardStatsContainer = document.querySelector(".stats-cards");


//     //return true or false based on a regular expression

//     function validateUsername(username) {
//         if (username.trim() == "") {
//             alert("Username should not be empty");
//             return false;
//         }
//         const regex = /^[a-zA-Z][a-zA-Z0-9_-]{2,24}$/;
//         const isMatching = regex.test(username);
//         if (!isMatching) {
//             alert("Invalid Username");
//         }
//         return isMatching;
//     }

//     async function fetchUsername(username) {

//         try {
//             SearchButton.textContent = "Searching....";
//             SearchButton.disabled = true;
//             statscotainer.classList.add("hidden");

//             // const response = await fetch(url);
//             const proxyurl = 'https://cors-anywhere.herokuapp.com/';
//             const targetUrl = 'https://leetcode.com//graphql';
//             const myHeaders = new Headers();
//             myHeaders.append("content-type", "application/json");

//             const graphql = JSON.stringify({
//                 query: `
//                     query userSessionProgress($username: String!) {
//                         allQuestionsCount {
//                             difficulty
//                             count
//                         }
//                         matchedUser(username: $username) {
//                             submitStats {
//                                 acSubmissionNum {
//                                     difficulty
//                                     count
//                                     submissions
//                                 }
//                                 totalSubmissionNum {
//                                     difficulty
//                                     count
//                                     submissions
//                                 }
//                             }
//                         }
//                     }
//                 `,
//                 variables: { "username": `${username}` }
//             })
//             const requestOptions = {
//                 method: "POST",
//                 headers: myHeaders,
//                 body: graphql,
//                 redirect: "follow"
//             }
//             const response = await fetch(proxyurl + targetUrl, requestOptions);

//             if (!response.ok) {
//                 throw new Error("Unable to fetch the user details");
//             }

//             const parsedData = await response.json();
//             console.log("logging data: ", parsedData);


//             displayUserdata(parsedData);

//         }
//         catch (error) {
//             statscotainer.innerHTML = `<p>${error.message}</p>`
//             console.log("in catch");
//         }
//         finally {
//             statscotainer.classList.remove("hidden");
//             SearchButton.textContent = "Search";
//             SearchButton.disabled = false;
//         }
//     }


//     function updateProgress(solved, total, label, circle) {
//         const progressDegree = (solved / total) * 100;
//         circle.style.setProperty("--progress-degree", `${progressDegree}%`);
//         label.textContent = `${solved}/${total}`;
//     }


//     function displayUserdata(parsedData) {
//         const totalQuest = parsedData.data.allQuestionsCount[0].count;
//         const totalEasyQuest = parsedData.data.allQuestionsCount[1].count;
//         const totalMediumQuest = parsedData.data.allQuestionsCount[2].count;
//         const totalHardQuest = parsedData.data.allQuestionsCount[3].count;

//         const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
//         const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
//         const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
//         const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

//         updateProgress(solvedTotalEasyQues, totalEasyQuest, easylabel, easyProgressCircle);
//         updateProgress(solvedTotalMediumQues, totalMediumQuest, mediumlabel, mediumProgressCircle);
//         updateProgress(solvedTotalHardQues, totalHardQuest, hardlabel, hardProgressCircle);

//         const cardsData = [

//             {
//                 label: "Overall Submissions",
//                 value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions
//             },
//             {
//                 label: "Overall Easy Submissions",
//                 value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions
//             },
//             {
//                 label: "Overall Medimu Submissions",
//                 value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions
//             },
//             {
//                 label: "Overall Hard Submissions",
//                 value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions
//             }

//         ];

//         cardStatsContainer.innerHTML = cardsData.map(
//             data => 
//                     `<div class="cards">
//                     <h4>${data.value}</h4>
//                     <p>${data.label}</p>
//                     </div>`
//         ).join("")

//     }

//     SearchButton.addEventListener('click', function () {
//         const username = usernameInput.value;
//         console.log("Input :", username);
//         if (validateUsername(username)) {
//             fetchUsername(username);
//         }
//     })


// })







document.addEventListener('DOMContentLoaded', function () {
    // Get references to DOM elements
    const usernameInput = document.getElementById("user-input");
    const SearchButton = document.getElementById("search-btn");
    const statscotainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const easylabel = document.getElementById("easy-label");
    const mediumProgressCircle = document.querySelector(".Medium-progress");
    const mediumlabel = document.getElementById("Medium-label");
    const hardProgressCircle = document.querySelector(".Hard-progress");
    const hardlabel = document.getElementById("Hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    // Function to validate the username using a regular expression
    function validateUsername(username) {
        if (username.trim() == "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z][a-zA-Z0-9_-]{2,24}$/; // Regex for valid usernames
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    // Function to fetch user data from the LeetCode API
    async function fetchUsername(username) {
        try {
            // Update UI to show loading state
            SearchButton.textContent = "Searching....";
            SearchButton.disabled = true;
            statscotainer.classList.add("hidden"); // Hide stats container while fetching data

            // Set up the API request
            const proxyurl = 'https://cors-anywhere.herokuapp.com/'; // Proxy to bypass CORS
            const targetUrl = 'https://leetcode.com//graphql'; // LeetCode GraphQL API endpoint
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            // Define the GraphQL query
            const graphql = JSON.stringify({
                query: `
                    query userSessionProgress($username: String!) {
                        allQuestionsCount {
                            difficulty
                            count
                        }
                        matchedUser(username: $username) {
                            submitStats {
                                acSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                                totalSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                            }
                        }
                    }
                `,
                variables: { "username": `${username}` }
            });

            // Set up request options
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };

            // Send the request to the API
            const response = await fetch(proxyurl + targetUrl, requestOptions);

            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error("Unable to fetch the user details");
            }

            // Parse the response data
            const parsedData = await response.json();
            console.log("logging data: ", parsedData);

            // Display the fetched data
            displayUserdata(parsedData);
        } catch (error) {
            // Handle errors (e.g., network issues, invalid response)
            statscotainer.innerHTML = `<p>${error.message}</p>`; // Display error message
            console.log("in catch:", error); // Log the error for debugging
        } finally {
            // Reset the UI after the request completes (whether it succeeds or fails)
            statscotainer.classList.remove("hidden"); // Show stats container
            SearchButton.textContent = "Search"; // Reset button text
            SearchButton.disabled = false; // Re-enable the button
        }
    }

    // Function to update the progress circles
    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100; // Calculate progress percentage
        circle.style.setProperty("--progress-degree", `${progressDegree}%`); // Update CSS variable
        label.textContent = `${solved}/${total}`; // Update label text
    }

    // Function to display user data in the UI
    function displayUserdata(parsedData) {
        // Extract data from the API response
        const totalQuest = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQuest = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQuest = parsedData.data.allQuestionsCount[2].count;
        const totalHardQuest = parsedData.data.allQuestionsCount[3].count;

        const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        // Update progress circles
        updateProgress(solvedTotalEasyQues, totalEasyQuest, easylabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQuest, mediumlabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQuest, hardlabel, hardProgressCircle);

        // Prepare data for the stats cards
        const cardsData = [
            {
                label: "Overall Submissions",
                value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions
            },
            {
                label: "Overall Easy Submissions",
                value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions
            },
            {
                label: "Overall Medium Submissions",
                value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions
            },
            {
                label: "Overall Hard Submissions",
                value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions
            }
        ];

        // Update the stats cards in the UI
        cardStatsContainer.innerHTML = cardsData.map(
            data => `<div class="cards">
                        <h4>${data.value}</h4>
                        <p>${data.label}</p>
                    </div>`
        ).join(""); // Convert array to a single string
    }

    // Add click event listener to the search button
    SearchButton.addEventListener('click', function () {
        const username = usernameInput.value; // Get the username from the input field
        console.log("Input :", username); // Log the username for debugging
        if (validateUsername(username)) { // Validate the username
            fetchUsername(username); // Fetch user data if the username is valid
        }
    });
});