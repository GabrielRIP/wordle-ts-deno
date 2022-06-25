import {
  bgBrightBlack,
  bgGreen,
  bgYellow,
  black,
  bold,
  white,
} from 'https://deno.land/std@0.125.0/fmt/colors.ts';

const MAX_TRIES = 6;
const previousGuesses: Array<string> = [];

let globalResults = '';

// this pokemon should be fetched randomly from the API
const pokemon: string = 'pikachu';

let tries = 0;

function askWord() {
  const response = prompt('the pokemon is...');
  if (response == null) {
    return { error: 'te equivocaste con el nombre de Pokemon' };
  } else if (response.length !== pokemon.length) {
    return {
      error: `the pokemon name must be ${pokemon.length} characters long`,
    };
  } else if (previousGuesses.includes(response)) {
    return { error: 'You already tried this pokemon name!' };
  } else if (!/^[a-zA-Z]+$/.test(response)) {
    return { error: 'the pokemon name must contain only letters' };
  }
  return { response };
}

function print(guess: string) {
  console.clear();

  let results = '';

  const letters: Array<string> = [...guess];
  letters.forEach((letter, index) => {
    if (letter === pokemon[index]) {
      results += bgGreen(bold(black(letter)));
    } else if (pokemon.includes(letter)) {
      results += bgYellow(bold(black(letter)));
    } else {
      results += bgBrightBlack(bold(white(letter)));
    }
  });

  globalResults += `\n\t${results}`;
  console.log(globalResults);
}

function start(tries: number) {
  const { length } = pokemon;

  if (tries >= MAX_TRIES) {
    console.log('\t...You lost...');
    console.log(`The pokemon was ${pokemon}`);
    return;
  }

  let guess = '';
  while (guess === '') {
    const { error, response } = askWord();
    if (error) {
      console.error(error);
      continue;
    }

    if (response) guess = response;
  }

  if (guess === pokemon) {
    // check if the guess is correct
    print(guess);
    console.log('\n\t...You Won...\n');
  } else {
    print(guess);
    console.log('');
    tries = tries + 1;
    start(tries);
  }
}

start(0);
