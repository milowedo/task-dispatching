package com.restController;

import com.LongPolling.State.RequestPromise;
import com.entity.RegistrationModel;
import com.entity.User;
import com.LongPolling.Overseer;
import com.exceptionHandlingStuff.UserNotFoundException;
import com.services.UserServiceInterface;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserRestController {

    private final UserServiceInterface userService;
    private final Overseer overseer;

    @Autowired
    public UserRestController(UserServiceInterface userService, Overseer overseer) {
        this.userService = userService;
        this.overseer = overseer;
    }

    // subscribe for data to be sent back when available
    @NotNull
    @GetMapping("/subscribe")
    public RequestPromise handleAsync(HttpSession session){
        return overseer.subscribe(
                User.class.getName(),
                session,
                userService);
    }

    //GET USER BY ID
    @GetMapping("/{userID}")
    public ResponseEntity<User> getUser(@PathVariable int userID){
        User returnedUser = userService.getUser(userID);
//        session.invalidate();
        if(returnedUser !=null){
            return ResponseEntity.ok().body(returnedUser);
        }
        else throw new UserNotFoundException("User not found: " + userID);
    }

    @GetMapping("/key/{userKEY}")
    public ResponseEntity<User> getUserByKey(@PathVariable String userKEY){
        User value = userService.getUserByKey(userKEY);
        if(value != null){
            return ResponseEntity.ok().body(value);
        }else throw new UserNotFoundException("No user with key" + userKEY);
    }

    @PostMapping("/register")
    public ResponseEntity<?> addUser(@RequestBody RegistrationModel regModel){
        System.out.println("got the form " + regModel);
        int id = this.userService.saveUser(regModel);
        return ResponseEntity.ok().body(id);
    }


}
