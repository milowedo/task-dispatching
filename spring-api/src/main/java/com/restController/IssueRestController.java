package com.restController;

import com.LongPolling.Overseer;
import com.LongPolling.State.RequestPromise;
import com.entity.Issue;
import com.exceptionHandlingStuff.UserNotFoundException;
import com.services.IssueServiceInterface;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/issue")
public class IssueRestController {

    private final IssueServiceInterface issueService;
    private final Overseer overseer;

    @Autowired
    public IssueRestController(IssueServiceInterface issueService, Overseer overseer) {
        this.issueService = issueService;
        this.overseer = overseer;
    }

    // subscribe for data to be sent back when available
    @NotNull
    @GetMapping("/subscribe")
    public RequestPromise handleAsync(HttpSession session){
        return overseer.subscribe(
                Issue.class.getName(),
                session,
                issueService);
    }

    //fake update to make the overseer return data he is waiting for
    @NotNull
    @GetMapping("/trigger/{issueID}")
    public ResponseEntity<?> updateIssue(@PathVariable("issueID") int issueID){
        Issue temp = issueService.getIssue(issueID);
        issueService.addIssue(temp);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{issueID}")
    public ResponseEntity<Issue> getIssue(@PathVariable("issueID") int issueID){
        Issue returnedIssue = issueService.getIssue(issueID);
        if(returnedIssue != null){
            return ResponseEntity.ok().body(returnedIssue);
        }
        else throw new UserNotFoundException("User not found: " + issueID);
    }

    @PostMapping("/new")
    public ResponseEntity<?> addIssue(@RequestBody Issue issue){
        System.out.println(issue.toString());
        int id = issueService.addIssue(issue);
        return ResponseEntity.ok().body(id);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Issue>> getAllIssues(){
        return ResponseEntity.ok().body(issueService.getAllIssues());
    }

    @DeleteMapping("delete/{issueID}")
    public ResponseEntity<?> deleteIssue(@PathVariable("issueID") int issueID){
        issueService.deleteIssue(issueID);
        return ResponseEntity.ok().body("Issue with id of "+ issueID +" has been deleted");
    }
}
