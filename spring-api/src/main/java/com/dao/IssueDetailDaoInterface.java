package com.dao;

import com.entity.IssueDetail;

public interface IssueDetailDaoInterface {
    IssueDetail getDetail(int issueID);
    int addDetail(IssueDetail detail);
    void deleteDetail(int issueID);
}
