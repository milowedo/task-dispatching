package com.services;

import com.dao.IssueDetailDaoInterface;
import com.entity.IssueDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class IssueDetailServiceImpl implements IssueDetailServiceInterface {

    private final IssueDetailDaoInterface issueDetailService;

    @Autowired
    public IssueDetailServiceImpl(IssueDetailDaoInterface issueDetailService) {
        this.issueDetailService = issueDetailService;
    }

    @Override
    @Transactional
    public IssueDetail getDetail(int id) {
        return this.issueDetailService.getDetail(id);
    }

    @Override
    @Transactional
    public int addDetail(IssueDetail issueDetail) {
        return this.issueDetailService.addDetail(issueDetail);
    }

    @Override
    @Transactional
    public void deleteDetail(int id) {
        this.issueDetailService.deleteDetail(id);
    }
}
