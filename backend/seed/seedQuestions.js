const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("../models/questions");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected"));

const data = [

  // ─── 1998 FRANCE (15) ───────────────────────────────────────────────────────
  {
    year: 1998, difficulty: "easy",
    question: "Who won the FIFA World Cup 1998?",
    options: ["France", "Brazil", "Germany", "Italy"],
    answer: "France",
    explanation: "France defeated Brazil 3-0 in the final at Stade de France."
  },
  {
    year: 1998, difficulty: "easy",
    question: "Who was the Golden Boot winner at the 1998 World Cup?",
    options: ["Davor Suker", "Ronaldo", "Thierry Henry", "Dennis Bergkamp"],
    answer: "Davor Suker",
    explanation: "Davor Suker of Croatia scored 6 goals to win the Golden Boot."
  },
  {
    year: 1998, difficulty: "medium",
    question: "Who won the Golden Ball (best player) at the 1998 World Cup?",
    options: ["Ronaldo", "Zinedine Zidane", "Davor Suker", "Roberto Carlos"],
    answer: "Ronaldo",
    explanation: "Ronaldo won the Golden Ball despite Brazil losing the final."
  },
  {
    year: 1998, difficulty: "easy",
    question: "Where was the 1998 FIFA World Cup hosted?",
    options: ["France", "Germany", "Italy", "Spain"],
    answer: "France",
    explanation: "The 1998 World Cup was hosted by France."
  },
  {
    year: 1998, difficulty: "medium",
    question: "Who scored two headers in the 1998 World Cup final?",
    options: ["Zinedine Zidane", "Thierry Henry", "Emmanuel Petit", "Didier Deschamps"],
    answer: "Zinedine Zidane",
    explanation: "Zinedine Zidane scored twice with headers in the final against Brazil."
  },
  {
    year: 1998, difficulty: "easy",
    question: "How many goals did France score in the 1998 World Cup final?",
    options: ["3", "2", "1", "4"],
    answer: "3",
    explanation: "France won 3-0, with goals from Zidane (x2) and Petit."
  },
  {
    year: 1998, difficulty: "medium",
    question: "Who scored France's third goal in the 1998 World Cup final?",
    options: ["Emmanuel Petit", "Thierry Henry", "Patrick Vieira", "Youri Djorkaeff"],
    answer: "Emmanuel Petit",
    explanation: "Emmanuel Petit sealed the win in the 90th minute."
  },
  {
    year: 1998, difficulty: "easy",
    question: "Which country finished 3rd at the 1998 World Cup?",
    options: ["Croatia", "Netherlands", "Italy", "Germany"],
    answer: "Croatia",
    explanation: "Croatia made their debut World Cup and finished 3rd, beating Netherlands 2-1."
  },
  {
    year: 1998, difficulty: "medium",
    question: "Who captained France in the 1998 World Cup?",
    options: ["Didier Deschamps", "Zinedine Zidane", "Laurent Blanc", "Marcel Desailly"],
    answer: "Didier Deschamps",
    explanation: "Didier Deschamps captained France to their first World Cup title."
  },
  {
    year: 1998, difficulty: "hard",
    question: "Who was France's coach at the 1998 World Cup?",
    options: ["Aimé Jacquet", "Roger Lemerre", "Didier Deschamps", "Michel Platini"],
    answer: "Aimé Jacquet",
    explanation: "Aimé Jacquet coached France to victory and then retired after the tournament."
  },
  {
    year: 1998, difficulty: "medium",
    question: "How many goals did Davor Suker score at the 1998 World Cup?",
    options: ["6", "5", "7", "4"],
    answer: "6",
    explanation: "Davor Suker scored 6 goals to claim the Golden Boot."
  },
  {
    year: 1998, difficulty: "hard",
    question: "How many teams participated at the 1998 World Cup for the first time?",
    options: ["32", "24", "16", "28"],
    answer: "32",
    explanation: "The 1998 World Cup was the first to feature 32 teams."
  },
  {
    year: 1998, difficulty: "medium",
    question: "Which debutant nation reached the semi-finals at the 1998 World Cup?",
    options: ["Croatia", "Senegal", "South Korea", "Jamaica"],
    answer: "Croatia",
    explanation: "Croatia, in their first ever World Cup, reached the semi-finals."
  },
  {
    year: 1998, difficulty: "hard",
    question: "Who did Brazil defeat in the 1998 World Cup semi-final?",
    options: ["Netherlands", "France", "Germany", "Argentina"],
    answer: "Netherlands",
    explanation: "Brazil beat Netherlands on penalties 4-2 in the semi-final."
  },
  {
    year: 1998, difficulty: "easy",
    question: "Which country did France defeat in the 1998 World Cup final?",
    options: ["Brazil", "Italy", "Germany", "Argentina"],
    answer: "Brazil",
    explanation: "France defeated defending champions Brazil 3-0 in the final."
  },

  // ─── 2002 SOUTH KOREA / JAPAN (15) ──────────────────────────────────────────
  {
    year: 2002, difficulty: "easy",
    question: "Who won the FIFA World Cup 2002?",
    options: ["Brazil", "Germany", "South Korea", "Turkey"],
    answer: "Brazil",
    explanation: "Brazil defeated Germany 2-0 in the final."
  },
  {
    year: 2002, difficulty: "easy",
    question: "Who was the Golden Boot winner at the 2002 World Cup?",
    options: ["Ronaldo", "Oliver Kahn", "Miroslav Klose", "Rivaldo"],
    answer: "Ronaldo",
    explanation: "Ronaldo scored 8 goals, including both in the final."
  },
  {
    year: 2002, difficulty: "medium",
    question: "Who won the Golden Ball at the 2002 World Cup?",
    options: ["Oliver Kahn", "Ronaldo", "Rivaldo", "Ronaldinho"],
    answer: "Oliver Kahn",
    explanation: "German goalkeeper Oliver Kahn won the Golden Ball, the only goalkeeper to do so."
  },
  {
    year: 2002, difficulty: "easy",
    question: "Which two countries co-hosted the 2002 World Cup?",
    options: ["South Korea and Japan", "USA and Canada", "France and Germany", "Brazil and Argentina"],
    answer: "South Korea and Japan",
    explanation: "The 2002 World Cup was the first held in Asia, co-hosted by South Korea and Japan."
  },
  {
    year: 2002, difficulty: "easy",
    question: "What was the score in the 2002 World Cup final?",
    options: ["2-0", "3-1", "1-0", "2-1"],
    answer: "2-0",
    explanation: "Brazil beat Germany 2-0, with both goals from Ronaldo."
  },
  {
    year: 2002, difficulty: "medium",
    question: "Which African country eliminated defending champions France in the 2002 group stage?",
    options: ["Senegal", "Cameroon", "Nigeria", "Morocco"],
    answer: "Senegal",
    explanation: "Senegal, making their World Cup debut, beat France 1-0 in the opening game."
  },
  {
    year: 2002, difficulty: "medium",
    question: "Which Asian team reached the semi-finals for the first time in 2002?",
    options: ["South Korea", "Japan", "China", "Saudi Arabia"],
    answer: "South Korea",
    explanation: "South Korea, co-hosts, made a historic run to the semi-finals."
  },
  {
    year: 2002, difficulty: "easy",
    question: "Which country finished 3rd at the 2002 World Cup?",
    options: ["Turkey", "South Korea", "USA", "Senegal"],
    answer: "Turkey",
    explanation: "Turkey finished 3rd, their best ever World Cup finish."
  },
  {
    year: 2002, difficulty: "hard",
    question: "Who captained Brazil at the 2002 World Cup?",
    options: ["Cafu", "Roberto Carlos", "Ronaldo", "Rivaldo"],
    answer: "Cafu",
    explanation: "Cafu captained Brazil to their fifth World Cup title."
  },
  {
    year: 2002, difficulty: "hard",
    question: "Who was Brazil's coach at the 2002 World Cup?",
    options: ["Luiz Felipe Scolari", "Vanderlei Luxemburgo", "Tite", "Carlos Alberto Parreira"],
    answer: "Luiz Felipe Scolari",
    explanation: "Luiz Felipe Scolari, known as 'Big Phil', guided Brazil to glory."
  },
  {
    year: 2002, difficulty: "medium",
    question: "How many goals did Ronaldo score at the 2002 World Cup?",
    options: ["8", "6", "7", "5"],
    answer: "8",
    explanation: "Ronaldo scored 8 goals in 7 games, including 2 in the final."
  },
  {
    year: 2002, difficulty: "hard",
    question: "Who did South Korea beat in the 2002 World Cup quarter-finals?",
    options: ["Spain", "Italy", "France", "England"],
    answer: "Spain",
    explanation: "South Korea beat Spain on penalties in the quarter-finals."
  },
  {
    year: 2002, difficulty: "medium",
    question: "What was the first World Cup held in Asia?",
    options: ["2002", "2006", "1998", "2010"],
    answer: "2002",
    explanation: "2002 in South Korea and Japan was the first Asian World Cup."
  },
  {
    year: 2002, difficulty: "hard",
    question: "Who scored Senegal's winner against France in 2002?",
    options: ["Papa Bouba Diop", "El Hadji Diouf", "Salif Diao", "Henri Camara"],
    answer: "Papa Bouba Diop",
    explanation: "Papa Bouba Diop scored the only goal in one of the biggest World Cup upsets."
  },
  {
    year: 2002, difficulty: "medium",
    question: "Who did Brazil beat in the 2002 World Cup semi-final?",
    options: ["Turkey", "South Korea", "England", "USA"],
    answer: "Turkey",
    explanation: "Brazil beat Turkey 1-0 in the semi-final."
  },

  // ─── 2006 GERMANY (15) ──────────────────────────────────────────────────────
  {
    year: 2006, difficulty: "easy",
    question: "Who won the FIFA World Cup 2006?",
    options: ["Italy", "France", "Germany", "Brazil"],
    answer: "Italy",
    explanation: "Italy won on penalties against France (5-3) after a 1-1 draw."
  },
  {
    year: 2006, difficulty: "medium",
    question: "Who was the Golden Boot winner at the 2006 World Cup?",
    options: ["Miroslav Klose", "Ronaldo", "Thierry Henry", "Luca Toni"],
    answer: "Miroslav Klose",
    explanation: "Miroslav Klose of Germany scored 5 goals to win the Golden Boot."
  },
  {
    year: 2006, difficulty: "medium",
    question: "Who won the Golden Ball at the 2006 World Cup?",
    options: ["Zinedine Zidane", "Fabio Cannavaro", "Miroslav Klose", "Ronaldo"],
    answer: "Zinedine Zidane",
    explanation: "Zinedine Zidane won despite being sent off in the final."
  },
  {
    year: 2006, difficulty: "easy",
    question: "Where was the 2006 World Cup hosted?",
    options: ["Germany", "France", "Italy", "Spain"],
    answer: "Germany",
    explanation: "Germany hosted the 2006 FIFA World Cup."
  },
  {
    year: 2006, difficulty: "medium",
    question: "Who was sent off for headbutting Marco Materazzi in the 2006 final?",
    options: ["Zinedine Zidane", "Patrick Vieira", "Thierry Henry", "Frank Ribéry"],
    answer: "Zinedine Zidane",
    explanation: "Zidane headbutted Materazzi in extra time in what was his last match."
  },
  {
    year: 2006, difficulty: "easy",
    question: "Which country finished 3rd at the 2006 World Cup?",
    options: ["Germany", "Portugal", "England", "Argentina"],
    answer: "Germany",
    explanation: "Germany finished 3rd, beating Portugal 3-1 in the third-place play-off."
  },
  {
    year: 2006, difficulty: "hard",
    question: "Who was Italy's coach at the 2006 World Cup?",
    options: ["Marcello Lippi", "Roberto Mancini", "Antonio Conte", "Giovanni Trapattoni"],
    answer: "Marcello Lippi",
    explanation: "Marcello Lippi guided Italy to their fourth World Cup title."
  },
  {
    year: 2006, difficulty: "medium",
    question: "Who won the Golden Glove at the 2006 World Cup?",
    options: ["Gianluigi Buffon", "Oliver Kahn", "Fabien Barthez", "Jens Lehmann"],
    answer: "Gianluigi Buffon",
    explanation: "Gianluigi Buffon only conceded 2 goals during the tournament (1 was an own goal)."
  },
  {
    year: 2006, difficulty: "medium",
    question: "Who captained Italy at the 2006 World Cup?",
    options: ["Fabio Cannavaro", "Gianluigi Buffon", "Andrea Pirlo", "Francesco Totti"],
    answer: "Fabio Cannavaro",
    explanation: "Fabio Cannavaro won FIFA World Player of the Year after captaining Italy."
  },
  {
    year: 2006, difficulty: "hard",
    question: "Which country did France beat in the 2006 World Cup quarter-finals?",
    options: ["Brazil", "England", "Spain", "Argentina"],
    answer: "Brazil",
    explanation: "France beat Brazil 1-0 with a Thierry Henry goal."
  },
  {
    year: 2006, difficulty: "medium",
    question: "What was the score in the 2006 World Cup final after 90 minutes?",
    options: ["1-1", "0-0", "1-0", "2-1"],
    answer: "1-1",
    explanation: "Zidane scored via penalty, Materazzi equalised. Italy won 5-3 on penalties."
  },
  {
    year: 2006, difficulty: "hard",
    question: "Who did Portugal beat to finish 4th at the 2006 World Cup?",
    options: ["France", "Germany", "England", "Netherlands"],
    answer: "France",
    explanation: "Wait — Portugal lost to France in the semi-final, finishing 4th after losing the 3rd place match to Germany."
  },
  {
    year: 2006, difficulty: "medium",
    question: "Which Brazilian player scored his 15th World Cup goal at the 2006 tournament?",
    options: ["Ronaldo", "Ronaldinho", "Rivaldo", "Adriano"],
    answer: "Ronaldo",
    explanation: "Ronaldo broke the all-time World Cup scoring record at the time with 15 goals."
  },
  {
    year: 2006, difficulty: "hard",
    question: "Which team did England draw with in the 2006 group stage?",
    options: ["Sweden", "Portugal", "Paraguay", "Trinidad & Tobago"],
    answer: "Sweden",
    explanation: "England drew 2-2 with Sweden in the group stage."
  },
  {
    year: 2006, difficulty: "hard",
    question: "Who scored the only goal as France beat Brazil in the 2006 quarter-final?",
    options: ["Thierry Henry", "Zinedine Zidane", "Franck Ribéry", "Patrick Vieira"],
    answer: "Thierry Henry",
    explanation: "Thierry Henry's goal in the 57th minute put France into the semi-finals."
  },

  // ─── 2010 SOUTH AFRICA (15) ─────────────────────────────────────────────────
  {
    year: 2010, difficulty: "easy",
    question: "Who won the FIFA World Cup 2010?",
    options: ["Spain", "Netherlands", "Germany", "Uruguay"],
    answer: "Spain",
    explanation: "Spain won their first World Cup, defeating Netherlands 1-0 after extra time."
  },
  {
    year: 2010, difficulty: "medium",
    question: "Who was the Golden Boot winner at the 2010 World Cup?",
    options: ["Thomas Müller", "David Villa", "Wesley Sneijder", "Diego Forlán"],
    answer: "Thomas Müller",
    explanation: "Thomas Müller won the Golden Boot with 5 goals and 3 assists."
  },
  {
    year: 2010, difficulty: "medium",
    question: "Who won the Golden Ball at the 2010 World Cup?",
    options: ["Diego Forlán", "Xavi", "Iniesta", "Wesley Sneijder"],
    answer: "Diego Forlán",
    explanation: "Uruguay's Diego Forlán won the Golden Ball for his outstanding performances."
  },
  {
    year: 2010, difficulty: "easy",
    question: "Where was the 2010 World Cup hosted?",
    options: ["South Africa", "Brazil", "Egypt", "Morocco"],
    answer: "South Africa",
    explanation: "South Africa became the first African nation to host the World Cup."
  },
  {
    year: 2010, difficulty: "medium",
    question: "Who scored the winning goal in the 2010 World Cup final?",
    options: ["Andrés Iniesta", "David Villa", "Xavi", "Fernando Torres"],
    answer: "Andrés Iniesta",
    explanation: "Andrés Iniesta scored in the 116th minute to win Spain the title."
  },
  {
    year: 2010, difficulty: "easy",
    question: "Which musical instrument became iconic at the 2010 World Cup?",
    options: ["Vuvuzela", "Trumpet", "Drum", "Trombone"],
    answer: "Vuvuzela",
    explanation: "The vuvuzela, a South African horn, created the unique soundscape of the 2010 World Cup."
  },
  {
    year: 2010, difficulty: "medium",
    question: "Which country did Spain beat in the 2010 World Cup final?",
    options: ["Netherlands", "Germany", "Uruguay", "Brazil"],
    answer: "Netherlands",
    explanation: "Spain defeated Netherlands 1-0 after extra time."
  },
  {
    year: 2010, difficulty: "easy",
    question: "Which country finished 3rd at the 2010 World Cup?",
    options: ["Germany", "Uruguay", "Brazil", "Argentina"],
    answer: "Germany",
    explanation: "Germany beat Uruguay 3-2 in the third-place play-off."
  },
  {
    year: 2010, difficulty: "hard",
    question: "Who was Spain's coach at the 2010 World Cup?",
    options: ["Vicente del Bosque", "Luis Aragonés", "Julen Lopetegui", "Unai Emery"],
    answer: "Vicente del Bosque",
    explanation: "Vicente del Bosque led Spain to World Cup glory after their Euro 2008 win."
  },
  {
    year: 2010, difficulty: "medium",
    question: "Who was Spain's goalkeeper and captain at the 2010 World Cup?",
    options: ["Iker Casillas", "Víctor Valdés", "Pepe Reina", "David de Gea"],
    answer: "Iker Casillas",
    explanation: "Iker Casillas won the Golden Glove and captained Spain."
  },
  {
    year: 2010, difficulty: "hard",
    question: "Who handled the ball to deny Ghana a World Cup semi-final place in 2010?",
    options: ["Luis Suárez", "Diego Forlán", "Edinson Cavani", "Álvaro Pereira"],
    answer: "Luis Suárez",
    explanation: "Luis Suárez handled Dominic Adiyiah's goal-bound header on the line. He was sent off; Gyan missed the penalty."
  },
  {
    year: 2010, difficulty: "hard",
    question: "What was the score in the 2010 World Cup final?",
    options: ["1-0 AET", "2-1 AET", "1-0", "2-0"],
    answer: "1-0 AET",
    explanation: "Spain won 1-0 after extra time thanks to Iniesta's goal in the 116th minute."
  },
  {
    year: 2010, difficulty: "medium",
    question: "Which controversial ball was used at the 2010 World Cup?",
    options: ["Jabulani", "Teamgeist", "Brazuca", "Telstar"],
    answer: "Jabulani",
    explanation: "The Jabulani ball was criticised by goalkeepers for its unpredictable movement."
  },
  {
    year: 2010, difficulty: "hard",
    question: "How many goals did Spain concede during the entire 2010 World Cup?",
    options: ["2", "4", "1", "3"],
    answer: "2",
    explanation: "Spain only conceded 2 goals — one to Switzerland and an own goal — in 7 games."
  },
  {
    year: 2010, difficulty: "medium",
    question: "Which country defeated 5-time winners Brazil in the 2010 quarter-finals?",
    options: ["Netherlands", "Uruguay", "Germany", "Argentina"],
    answer: "Netherlands",
    explanation: "Netherlands knocked Brazil out 2-1 with a Robben goal."
  },

  // ─── 2014 BRAZIL (15) ───────────────────────────────────────────────────────
  {
    year: 2014, difficulty: "easy",
    question: "Who won the FIFA World Cup 2014?",
    options: ["Germany", "Argentina", "Brazil", "Netherlands"],
    answer: "Germany",
    explanation: "Germany defeated Argentina 1-0 after extra time in the final."
  },
  {
    year: 2014, difficulty: "medium",
    question: "Who was the Golden Boot winner at the 2014 World Cup?",
    options: ["James Rodríguez", "Thomas Müller", "Neymar", "Lionel Messi"],
    answer: "James Rodríguez",
    explanation: "Colombia's James Rodríguez scored 6 goals, including a stunning volley against Uruguay."
  },
  {
    year: 2014, difficulty: "medium",
    question: "Who won the Golden Ball at the 2014 World Cup?",
    options: ["Lionel Messi", "Thomas Müller", "James Rodríguez", "Manuel Neuer"],
    answer: "Lionel Messi",
    explanation: "Lionel Messi won the Golden Ball despite Argentina losing the final."
  },
  {
    year: 2014, difficulty: "easy",
    question: "Where was the 2014 World Cup hosted?",
    options: ["Brazil", "Argentina", "Colombia", "Chile"],
    answer: "Brazil",
    explanation: "Brazil hosted the 2014 World Cup, their second after 1950."
  },
  {
    year: 2014, difficulty: "medium",
    question: "Who scored the winning goal in the 2014 World Cup final?",
    options: ["Mario Götze", "Thomas Müller", "André Schürrle", "Miroslav Klose"],
    answer: "Mario Götze",
    explanation: "Mario Götze scored in the 113th minute of extra time."
  },
  {
    year: 2014, difficulty: "easy",
    question: "What was the score when Germany beat Brazil in the 2014 semi-final?",
    options: ["7-1", "5-0", "6-1", "4-0"],
    answer: "7-1",
    explanation: "Germany's 7-1 demolition of Brazil is known as the 'Mineirazo'."
  },
  {
    year: 2014, difficulty: "easy",
    question: "Which country finished 3rd at the 2014 World Cup?",
    options: ["Netherlands", "Brazil", "Argentina", "Colombia"],
    answer: "Netherlands",
    explanation: "Netherlands beat Brazil 3-0 in the third-place play-off."
  },
  {
    year: 2014, difficulty: "hard",
    question: "Who was Germany's coach at the 2014 World Cup?",
    options: ["Joachim Löw", "Jürgen Klopp", "Hans-Dieter Flick", "Otto Rehhagel"],
    answer: "Joachim Löw",
    explanation: "Joachim Löw coached Germany for 15 years and won the 2014 World Cup."
  },
  {
    year: 2014, difficulty: "medium",
    question: "How many goals did James Rodríguez score at the 2014 World Cup?",
    options: ["6", "5", "7", "4"],
    answer: "6",
    explanation: "James Rodríguez scored 6 goals including a famous volley vs Uruguay."
  },
  {
    year: 2014, difficulty: "medium",
    question: "Who won the Golden Glove at the 2014 World Cup?",
    options: ["Manuel Neuer", "Keylor Navas", "Tim Howard", "Sergio Romero"],
    answer: "Manuel Neuer",
    explanation: "Manuel Neuer's sweeper-keeper style earned him the Golden Glove."
  },
  {
    year: 2014, difficulty: "medium",
    question: "Which Brazilian player was injured and missed the rest of the 2014 World Cup?",
    options: ["Neymar", "David Luiz", "Hulk", "Oscar"],
    answer: "Neymar",
    explanation: "Neymar suffered a fractured vertebra after a knee to the back from Colombia's Zúñiga."
  },
  {
    year: 2014, difficulty: "hard",
    question: "What is the Portuguese nickname for Germany's 7-1 win over Brazil in 2014?",
    options: ["Mineirazo", "Maracanazo", "Mundialito", "Catástrofe"],
    answer: "Mineirazo",
    explanation: "Named after the Estádio Mineirão in Belo Horizonte where the match was played."
  },
  {
    year: 2014, difficulty: "medium",
    question: "Which surprise team reached the quarter-finals at the 2014 World Cup?",
    options: ["Costa Rica", "Algeria", "United States", "Greece"],
    answer: "Costa Rica",
    explanation: "Costa Rica topped a group containing Uruguay, Italy and England, and reached the QF."
  },
  {
    year: 2014, difficulty: "easy",
    question: "Who did Germany beat in the 2014 World Cup final?",
    options: ["Argentina", "Brazil", "Netherlands", "France"],
    answer: "Argentina",
    explanation: "Germany defeated Argentina 1-0 after extra time."
  },
  {
    year: 2014, difficulty: "hard",
    question: "Who captained Germany at the 2014 World Cup?",
    options: ["Philipp Lahm", "Bastian Schweinsteiger", "Michael Ballack", "Per Mertesacker"],
    answer: "Philipp Lahm",
    explanation: "Philipp Lahm captained Germany and announced his international retirement after winning."
  },

  // ─── 2018 RUSSIA (15) ───────────────────────────────────────────────────────
  {
    year: 2018, difficulty: "easy",
    question: "Who won the FIFA World Cup 2018?",
    options: ["France", "Croatia", "Belgium", "England"],
    answer: "France",
    explanation: "France defeated Croatia 4-2 in the final in Moscow."
  },
  {
    year: 2018, difficulty: "medium",
    question: "Who was the Golden Boot winner at the 2018 World Cup?",
    options: ["Harry Kane", "Kylian Mbappé", "Romelu Lukaku", "Antoine Griezmann"],
    answer: "Harry Kane",
    explanation: "Harry Kane scored 6 goals including two hat-tricks for England."
  },
  {
    year: 2018, difficulty: "medium",
    question: "Who won the Golden Ball at the 2018 World Cup?",
    options: ["Luka Modrić", "Kylian Mbappé", "Antoine Griezmann", "Eden Hazard"],
    answer: "Luka Modrić",
    explanation: "Luka Modrić won the Golden Ball after leading Croatia to the final."
  },
  {
    year: 2018, difficulty: "easy",
    question: "Where was the 2018 World Cup hosted?",
    options: ["Russia", "China", "Japan", "Qatar"],
    answer: "Russia",
    explanation: "Russia hosted its first World Cup in 2018."
  },
  {
    year: 2018, difficulty: "easy",
    question: "What was the score in the 2018 World Cup final?",
    options: ["4-2", "3-1", "4-1", "3-2"],
    answer: "4-2",
    explanation: "France beat Croatia 4-2, with an own goal and a VAR penalty among the goals."
  },
  {
    year: 2018, difficulty: "medium",
    question: "Which country reached their first World Cup final in 2018?",
    options: ["Croatia", "Belgium", "England", "Sweden"],
    answer: "Croatia",
    explanation: "Croatia reached their first ever World Cup final, losing 4-2 to France."
  },
  {
    year: 2018, difficulty: "medium",
    question: "What technology was introduced to the World Cup for the first time in 2018?",
    options: ["VAR", "Goal-line technology", "Electronic offside", "Sin-bin"],
    answer: "VAR",
    explanation: "Video Assistant Referee (VAR) was used at a World Cup for the first time in Russia 2018."
  },
  {
    year: 2018, difficulty: "easy",
    question: "Which country finished 3rd at the 2018 World Cup?",
    options: ["Belgium", "England", "Uruguay", "Brazil"],
    answer: "Belgium",
    explanation: "Belgium beat England 2-0 in the third-place play-off."
  },
  {
    year: 2018, difficulty: "hard",
    question: "Who was France's coach at the 2018 World Cup?",
    options: ["Didier Deschamps", "Laurent Blanc", "Raymond Domenech", "Guy Roux"],
    answer: "Didier Deschamps",
    explanation: "Didier Deschamps became only the third person to win the World Cup as player and manager."
  },
  {
    year: 2018, difficulty: "medium",
    question: "How many goals did Harry Kane score at the 2018 World Cup?",
    options: ["6", "5", "7", "4"],
    answer: "6",
    explanation: "Harry Kane scored 6 goals including penalties and a hat-trick against Panama."
  },
  {
    year: 2018, difficulty: "medium",
    question: "Who became the second teenager to score in a World Cup final in 2018?",
    options: ["Kylian Mbappé", "Ousmane Dembélé", "Marcus Rashford", "Trent Alexander-Arnold"],
    answer: "Kylian Mbappé",
    explanation: "Mbappé (19) scored in the final, the second teen to do so after Pelé in 1958."
  },
  {
    year: 2018, difficulty: "medium",
    question: "Who won the Golden Glove at the 2018 World Cup?",
    options: ["Thibaut Courtois", "Hugo Lloris", "Jordan Pickford", "Danijel Subašić"],
    answer: "Thibaut Courtois",
    explanation: "Thibaut Courtois of Belgium won the Golden Glove despite Belgium finishing 3rd."
  },
  {
    year: 2018, difficulty: "hard",
    question: "Who scored a hat-trick against Spain in the 2018 group stage?",
    options: ["Cristiano Ronaldo", "Diego Costa", "Iago Aspas", "Gerard Moreno"],
    answer: "Cristiano Ronaldo",
    explanation: "Ronaldo scored 3 goals as Portugal drew 3-3 with Spain."
  },
  {
    year: 2018, difficulty: "medium",
    question: "Who captained Croatia at the 2018 World Cup?",
    options: ["Luka Modrić", "Ivan Rakitić", "Mario Mandžukić", "Dejan Lovren"],
    answer: "Luka Modrić",
    explanation: "Luka Modrić captained Croatia to the final and won the Golden Ball."
  },
  {
    year: 2018, difficulty: "hard",
    question: "Which defending champion was knocked out in the 2018 group stage?",
    options: ["Germany", "France", "Spain", "Brazil"],
    answer: "Germany",
    explanation: "Germany, defending champions, were eliminated in the group stage."
  },

  // ─── 2022 QATAR (15) ────────────────────────────────────────────────────────
  {
    year: 2022, difficulty: "easy",
    question: "Who won the FIFA World Cup 2022?",
    options: ["Argentina", "France", "Morocco", "Croatia"],
    answer: "Argentina",
    explanation: "Argentina won their third World Cup, defeating France on penalties."
  },
  {
    year: 2022, difficulty: "easy",
    question: "Who was the Golden Boot winner at the 2022 World Cup?",
    options: ["Kylian Mbappé", "Lionel Messi", "Olivier Giroud", "Julián Álvarez"],
    answer: "Kylian Mbappé",
    explanation: "Kylian Mbappé scored 8 goals, including a hat-trick in the final."
  },
  {
    year: 2022, difficulty: "easy",
    question: "Who won the Golden Ball at the 2022 World Cup?",
    options: ["Lionel Messi", "Kylian Mbappé", "Luka Modrić", "Achraf Hakimi"],
    answer: "Lionel Messi",
    explanation: "Lionel Messi won his second Golden Ball after lifting the World Cup trophy."
  },
  {
    year: 2022, difficulty: "easy",
    question: "Where was the 2022 World Cup hosted?",
    options: ["Qatar", "Saudi Arabia", "UAE", "Bahrain"],
    answer: "Qatar",
    explanation: "Qatar hosted the 2022 World Cup, the first in the Middle East."
  },
  {
    year: 2022, difficulty: "medium",
    question: "What was the result in the 2022 World Cup final after 120 minutes?",
    options: ["3-3", "2-2", "4-3", "3-2"],
    answer: "3-3",
    explanation: "Argentina led 2-0, Mbappé scored a hat-trick to make it 3-3. Argentina won 4-2 on penalties."
  },
  {
    year: 2022, difficulty: "medium",
    question: "Which African country made history by reaching the 2022 World Cup semi-finals?",
    options: ["Morocco", "Senegal", "Ghana", "Cameroon"],
    answer: "Morocco",
    explanation: "Morocco became the first African nation to reach a World Cup semi-final."
  },
  {
    year: 2022, difficulty: "medium",
    question: "Who scored a hat-trick in the 2022 World Cup final?",
    options: ["Kylian Mbappé", "Lionel Messi", "Julián Álvarez", "Olivier Giroud"],
    answer: "Kylian Mbappé",
    explanation: "Mbappé scored 3 goals in the final, including a brace in 97 seconds."
  },
  {
    year: 2022, difficulty: "easy",
    question: "Which country finished 3rd at the 2022 World Cup?",
    options: ["Croatia", "Morocco", "Netherlands", "France"],
    answer: "Croatia",
    explanation: "Croatia beat Morocco 2-1 in the third-place play-off."
  },
  {
    year: 2022, difficulty: "hard",
    question: "Who was Argentina's coach at the 2022 World Cup?",
    options: ["Lionel Scaloni", "Diego Simeone", "Marcelo Gallardo", "Jorge Sampaoli"],
    answer: "Lionel Scaloni",
    explanation: "Lionel Scaloni, who played under Pekerman, led Argentina to glory at just 44."
  },
  {
    year: 2022, difficulty: "medium",
    question: "How many goals did Kylian Mbappé score at the 2022 World Cup?",
    options: ["8", "6", "7", "9"],
    answer: "8",
    explanation: "Mbappé scored 8 goals including a hat-trick in the final."
  },
  {
    year: 2022, difficulty: "medium",
    question: "Who won the Golden Glove at the 2022 World Cup?",
    options: ["Emiliano Martínez", "Hugo Lloris", "Yassine Bounou", "Dominik Livaković"],
    answer: "Emiliano Martínez",
    explanation: "Emiliano Martínez was outstanding in shootouts for Argentina."
  },
  {
    year: 2022, difficulty: "hard",
    question: "Which team caused a major upset by beating Argentina in the 2022 group stage?",
    options: ["Saudi Arabia", "Poland", "Mexico", "Australia"],
    answer: "Saudi Arabia",
    explanation: "Saudi Arabia beat Argentina 2-1 in one of the greatest World Cup upsets."
  },
  {
    year: 2022, difficulty: "medium",
    question: "In which months was the 2022 World Cup held?",
    options: ["November-December", "June-July", "July-August", "October-November"],
    answer: "November-December",
    explanation: "Due to Qatar's extreme summer heat, the 2022 World Cup was held in winter."
  },
  {
    year: 2022, difficulty: "hard",
    question: "Who scored the winning penalty in the 2022 World Cup final shootout?",
    options: ["Gonzalo Montiel", "Leandro Paredes", "Lautaro Martínez", "Paulo Dybala"],
    answer: "Gonzalo Montiel",
    explanation: "Gonzalo Montiel, who had conceded the VAR penalty in the final, scored the winner in the shootout."
  },
  {
    year: 2022, difficulty: "medium",
    question: "Who captained Argentina at the 2022 World Cup?",
    options: ["Lionel Messi", "Ángel Di María", "Sergio Agüero", "Alejandro Gómez"],
    answer: "Lionel Messi",
    explanation: "Lionel Messi captained Argentina and scored 7 goals in the tournament."
  },

  // ─── GENERAL WORLD CUP HISTORY (15) ─────────────────────────────────────────
  {
    year: 1970, difficulty: "easy",
    question: "Which country has won the most FIFA World Cup titles?",
    options: ["Brazil", "Germany", "Italy", "Argentina"],
    answer: "Brazil",
    explanation: "Brazil has won 5 World Cup titles (1958, 1962, 1970, 1994, 2002)."
  },
  {
    year: 1958, difficulty: "medium",
    question: "Who holds the record for most goals scored in World Cup history?",
    options: ["Miroslav Klose", "Ronaldo", "Gerd Müller", "Pelé"],
    answer: "Miroslav Klose",
    explanation: "Miroslav Klose scored 16 goals across four World Cups (2002–2014)."
  },
  {
    year: 1958, difficulty: "medium",
    question: "Who won the FIFA World Cup 1958?",
    options: ["Brazil", "Sweden", "France", "Germany"],
    answer: "Brazil",
    explanation: "Brazil won their first World Cup in Sweden, with a teenage Pelé scoring twice in the final."
  },
  {
    year: 1958, difficulty: "hard",
    question: "Who is the youngest player to score in a World Cup final?",
    options: ["Pelé", "Kylian Mbappé", "Cesc Fàbregas", "Wayne Rooney"],
    answer: "Pelé",
    explanation: "Pelé was 17 years and 249 days old when he scored twice in the 1958 World Cup final."
  },
  {
    year: 1990, difficulty: "medium",
    question: "Which African country first reached the World Cup quarter-finals in 1990?",
    options: ["Cameroon", "Senegal", "Nigeria", "Ghana"],
    answer: "Cameroon",
    explanation: "Cameroon's 'Indomitable Lions' reached the quarter-finals in Italy 1990."
  },
  {
    year: 1966, difficulty: "easy",
    question: "Who won the FIFA World Cup 1966?",
    options: ["England", "West Germany", "Portugal", "Soviet Union"],
    answer: "England",
    explanation: "England won their only World Cup title on home soil, beating West Germany 4-2."
  },
  {
    year: 1970, difficulty: "easy",
    question: "Who won the FIFA World Cup 1970?",
    options: ["Brazil", "Italy", "West Germany", "Uruguay"],
    answer: "Brazil",
    explanation: "Brazil won the 1970 World Cup in Mexico with Pelé, Jairzinho and Tostão."
  },
  {
    year: 1974, difficulty: "medium",
    question: "Who won the FIFA World Cup 1974?",
    options: ["West Germany", "Netherlands", "Brazil", "Poland"],
    answer: "West Germany",
    explanation: "West Germany defeated Netherlands 2-1 in the final, despite the Dutch's 'Total Football'."
  },
  {
    year: 1978, difficulty: "medium",
    question: "Who won the FIFA World Cup 1978?",
    options: ["Argentina", "Netherlands", "Brazil", "Italy"],
    answer: "Argentina",
    explanation: "Argentina won their first World Cup on home soil, defeating Netherlands 3-1 AET."
  },
  {
    year: 1982, difficulty: "medium",
    question: "Who won the FIFA World Cup 1982?",
    options: ["Italy", "West Germany", "Brazil", "France"],
    answer: "Italy",
    explanation: "Italy won their third World Cup in Spain, with Paolo Rossi scoring 6 goals."
  },
  {
    year: 1986, difficulty: "easy",
    question: "Who won the FIFA World Cup 1986?",
    options: ["Argentina", "West Germany", "France", "Brazil"],
    answer: "Argentina",
    explanation: "Argentina won, with Diego Maradona's two famous goals against England."
  },
  {
    year: 1994, difficulty: "medium",
    question: "Who won the FIFA World Cup 1994?",
    options: ["Brazil", "Italy", "USA", "Sweden"],
    answer: "Brazil",
    explanation: "Brazil won on penalties after a 0-0 draw with Italy. Roberto Baggio missed the decisive penalty."
  },
  {
    year: 1986, difficulty: "hard",
    question: "Which country has hosted the FIFA World Cup twice?",
    options: ["Mexico", "Brazil", "Italy", "All of these"],
    answer: "All of these",
    explanation: "Mexico (1970, 1986), Italy (1934, 1990), France (1938, 1998), Germany (1974, 2006) and Brazil (1950, 2014) have all hosted twice."
  },
  {
    year: 1986, difficulty: "medium",
    question: "Who scored the 'Hand of God' goal at the 1986 World Cup?",
    options: ["Diego Maradona", "Jorge Valdano", "Jorge Burruchaga", "Claudio Caniggia"],
    answer: "Diego Maradona",
    explanation: "Maradona punched the ball into the net vs England in 1986 and called it the 'Hand of God'."
  },
  {
    year: 1950, difficulty: "hard",
    question: "Which shock result at the 1950 World Cup is known as the 'Maracanazo'?",
    options: ["Uruguay beat Brazil", "USA beat England", "India withdrew", "France lost to Mexico"],
    answer: "Uruguay beat Brazil",
    explanation: "Uruguay beat Brazil 2-1 in the final round at the Maracanã in front of ~200,000 fans."
  }

];

async function seed() {
  await Question.deleteMany();
  await Question.insertMany(data);
  console.log(`Seed complete — ${data.length} questions inserted.`);
  process.exit();
}

seed();
