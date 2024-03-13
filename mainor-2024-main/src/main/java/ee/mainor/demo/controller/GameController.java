package ee.mainor.demo.controller;

import ee.mainor.demo.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping("/start")
    public String startGame() {
        gameService.generateNewNumber();
        return "Guess a number between 1 and 100";
    }

    @PostMapping("/guess")
    public String guess(@RequestParam int guess) {
        return gameService.checkGuess(guess);
    }
}
