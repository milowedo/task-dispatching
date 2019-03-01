package com.services;

import com.entity.IssueDetail;

public interface IssueDetailServiceInterface {

    IssueDetail getDetail(int id);
    int addDetail(IssueDetail issueDetail);
    void deleteDetail(int id);
}
