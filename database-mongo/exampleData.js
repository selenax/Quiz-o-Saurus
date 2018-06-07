const userData = {
  email: 'admin@gmail.com',
  attempts: [
    {
      quizId: 'dinosaur',
      score: 0
    }
  ]
};

const quizData = {
  creator: 'admin@gmail.com',
  quizzes: [
    {
      quizName: 'dinosaur',
      questions: [
        {
          text: 'How long have dinosaurs lived on earth?',
          options: ['245 million years', '24.5 million years', '2.45 million years', '245,000 years'],
          correctAnswer: '245 million years'
        },
        {
          text: 'Roughly how many species of extinct dinosaurs are known to have existed?',
          options: ['350', '700', '3,500', '7,000'],
          correctAnswer: '700'
        },
        {
          text: 'How many continents have dinosaur fossils been found on?',
          options: ['4', '5', '6', '7'],
          correctAnswer: '7'
        },
        {
          text: 'What is a person who studies dinosaurs known as?',
          options: ['archaeologist', 'fossilologist', 'paleontologist', 'dinosaurologist'],
          correctAnswer: 'paleontologist'
        },
        {
          text: 'What was the first dinosaur to be formally named in 1824?',
          options: ['Megalosaurus', 'Brachiosaurus', 'Stegosaurus', 'Ankylosaurus'],
          correctAnswer: 'Megalosaurus'
        },
        {
          text: 'From what type of dinosaurs did birds descend?',
          options: ['pterosaurs', 'herrerasaurids', 'theropods', 'sauropods'],
          correctAnswer: 'theropods'
        },
        {
          text: 'What is often referred to as the Age of the Dinosaurs because most dinosaurs developed and became extinct during this time?',
          options: ['Paleozoic Era', 'Mesozoic Era', 'Cenozoic Era', 'None of the above'],
          correctAnswer: 'Mesozoic Era'
        },
        {
          text: 'How many horns did Triceratops have?',
          options: ['0', '1', '2', '3'],
          correctAnswer: '3'
        },
        {
          text: 'What was the largest dinosaur?',
          options: ['Argentinosaurus', 'Apatosaurus', 'Tyrannosaurus Rex', 'Giganotosaurus'],
          correctAnswer: 'Argentinosaurus'
        },
        {
          text: 'During what time period did the Tyrannosaurus Rex live?',
          options: ['Triassic Period', 'Jurassic Period', 'Cretaceous Period', 'Paleogene Period'],
          correctAnswer: 'Cretaceous Period'
        }
      ]
    }
  ]
};

var insertData = function() {

};

insertData();

export default userData;
export default quizData;