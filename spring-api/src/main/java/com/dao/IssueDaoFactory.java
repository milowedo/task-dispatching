package com.dao;

import com.entity.Issue;
import java.util.List;

public interface IssueDaoFactory {

    int addIssue(Issue issue);
    Issue getIssue(int id);
    List<Issue> getAllIssues();
    void deleteIssue(int id);
}
