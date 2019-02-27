package com.restController;

import com.LongPolling.State.RequestPromise;
import com.entity.User;
import com.LongPolling.Overseer;
import com.exceptionHandlingStuff.EmployeeNotFoundException;
import com.services.UserServiceInterface;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/employee")
public class EmployeeRestController {

    private final UserServiceInterface employeeService;
    private final Overseer overseer;

    @Autowired
    public EmployeeRestController(UserServiceInterface employeeService, Overseer overseer) {
        this.employeeService = employeeService;
        this.overseer = overseer;
    }

    // subscribe for data to be sent back when available
    @NotNull
    @GetMapping("/subscribe")
    public RequestPromise handleAsync(HttpSession session){
        return overseer.subscribe(
                User.class.getName(),
                session,
                employeeService);
    }

    @NotNull
    @GetMapping("/trigger/{employeeId}")
    public ResponseEntity<?> updateEmployee(@PathVariable int employeeId){
        User temp = employeeService.getUser(employeeId);
        employeeService.saveUser(temp);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //GET EMPLOYEE BY ID
    @GetMapping("/{employeeId}")
    public ResponseEntity<User> getEmployee(@PathVariable int employeeId){
        User returnedUser = employeeService.getUser(employeeId);
//        session.invalidate();
        if(returnedUser !=null){
            return ResponseEntity.ok().body(returnedUser);
        }
        else throw new EmployeeNotFoundException("User not found: " + employeeId);
    }


}
