package com.services;

import com.LongPolling.ServiceInterface;
import com.entity.Issue;

import java.util.List;

public interface IssueServiceInterface extends ServiceInterface {
    int addIssue(Issue issue);
    Issue getIssue(int id);
    List<Issue> getAllIssues();
    void deleteIssue(int id);
}
