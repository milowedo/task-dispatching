package com.restController;

import com.entity.IssueDetail;
import com.services.IssueDetailServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/issueDetail")
public class IssueDetailController {

    private final IssueDetailServiceInterface issueDetailService;

    @Autowired
    public IssueDetailController(IssueDetailServiceInterface issueDetailService) {
        this.issueDetailService = issueDetailService;
    }

    @PostMapping("/new")
    public ResponseEntity<?> addNewDetail(@RequestBody IssueDetail issueDetail){
        int id = this.issueDetailService.addDetail(issueDetail);
        return ResponseEntity.ok().body(id);
    }

    @GetMapping("/{detailID}")
    public ResponseEntity<IssueDetail> getIssue(@PathVariable("detailID") int detailID){
        IssueDetail returnedIssue = issueDetailService.getDetail(detailID);
        if(returnedIssue != null){
            return ResponseEntity.ok().body(returnedIssue);
        }
        else return ResponseEntity.notFound().build();
    }


    @DeleteMapping("delete/{issueID}")
    public ResponseEntity<?> deleteDetail(@PathVariable("issueID") int issueID){
        issueDetailService.deleteDetail(issueID);
        return ResponseEntity.ok().body("Issue with id of "+ issueID +" has been deleted");
    }
}
