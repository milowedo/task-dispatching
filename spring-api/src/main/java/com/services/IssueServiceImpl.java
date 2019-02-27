package com.services;

import com.LongPolling.ServicePoll;
import com.dao.IssueDaoFactory;
import com.entity.Issue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


@Service
public class IssueServiceImpl extends ServicePoll implements IssueServiceInterface {

    private final IssueDaoFactory issueDaoFactory;

    @Autowired
    public IssueServiceImpl(IssueDaoFactory issueDaoFactory) {
        this.issueDaoFactory = issueDaoFactory;
    }

    @Override
    @Transactional
    public int addIssue(Issue issue) {
        int id = issueDaoFactory.addIssue(issue);
        this.notifyOfChange(issue);
        return id;
    }

    @Override
    @Transactional
    public Issue getIssue(int id) {
        return issueDaoFactory.getIssue(id);
    }

    @Override
    @Transactional
    public List<Issue> getAllIssues() {
        return issueDaoFactory.getAllIssues();
    }

    @Override
    @Transactional
    public void deleteIssue(int id){
        issueDaoFactory.deleteIssue(id);
    }
    
}
