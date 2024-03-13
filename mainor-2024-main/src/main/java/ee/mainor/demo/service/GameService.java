package ee.mainor.demo.service;

import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class GameService {
    private int randomNumber;
    private Random random = new Random();

    public void generateNewNumber() {
        this.randomNumber = random.nextInt(100) + 1;
    }

    public String checkGuess(int guess) {
        if (guess < 1 || guess > 100) {
            return "Guess must be between 1 and 100.";
        }
        if (guess < randomNumber) {
            return "Higher";
        } else if (guess > randomNumber) {
            return "Lower";
        } else {
            return "Correct! The number was " + randomNumber;
        }
    }
}
