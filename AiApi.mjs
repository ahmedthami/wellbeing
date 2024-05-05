import fetch from 'node-fetch'
import {HfInference} from '@huggingface/inference'

const apiKey = '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';  // Replace with your API key
const inference = new HfInference(apiKey);

async function getStudentAdvice(studentInfo) {
    // Convert student info into a prompt for GPT-Neo
    const prompt = `
Given the following student's information (daily update):
Grades: ${studentInfo.grades}
Hobbies: ${studentInfo.hobbies}
Unique Skills: ${studentInfo.unique_skills}
Daily Activity: ${studentInfo.daily_activity}
Professor's Remarks: ${studentInfo.prof_remarks}

Additional Judgement Fields:
Attendance: ${studentInfo.attendance}
Participation: ${studentInfo.participation}
Assignments: ${studentInfo.assignments}
Teamwork: ${studentInfo.teamwork}
Punctuality: ${studentInfo.punctuality}
Focus: ${studentInfo.focus}
Communication: ${studentInfo.communication}
Progress: ${studentInfo.progress}
Problem-solving: ${studentInfo.problem_solving}
Behavior: ${studentInfo.behavior}

Please provide a list of advice on how to deal with this student as a professor.
    `;

    // Call the GPT-Neo model via Hugging Face Inference API
    const response = await inference.textGeneration({
        model: 'EleutherAI/gpt-neo-2.7B', // Choose the GPT-Neo model you want to use
        inputs: prompt,
        parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
        }
    });

    // Extract the advice from the API response
    const advice = response.generated_text.trim();

    // Return the advice as a list (split by newlines)
    const adviceList = advice.split('\n').filter(line => line.trim() !== '');

    return adviceList;
}

// Example usage
const strugglingStudentInfo = {
    grades: 'D in Mathematics, C- in English',
    hobbies: 'Playing video games, social media',
    unique_skills: 'Creativity, adaptability',
    daily_activity: 'Absent from classes often, distracted in class',
    prof_remarks: `Struggles to keep up with course material.
                   Frequently absent from classes.
                   Shows lack of focus and motivation in class.
                   Has difficulty completing assignments on time.
                   Needs to work on communication and engagement with peers.
                   Requires extra support to catch up on coursework.`,
    attendance: 'Poor',
    participation: 'Low',
    assignments: 'Incomplete or late submissions',
    teamwork: 'Does not actively engage with peers',
    punctuality: 'Often late',
    focus: 'Easily distracted',
    communication: 'Limited interaction and unclear expression',
    progress: 'Slow improvement',
    problem_solving: 'Needs more guidance and practice',
    behavior: 'Disruptive behavior at times',
};

getStudentAdvice(strugglingStudentInfo)
    .then(advice => {
        console.log('Advice for the student:');
        advice.forEach(line => {
            console.log(line);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
