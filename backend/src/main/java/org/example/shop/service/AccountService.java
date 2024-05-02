package org.example.shop.service;

import org.example.shop.entities.Account;
import org.example.shop.models.AccountModel;

import java.util.List;

public interface AccountService {
    Boolean  register(Account account) throws Exception;
    AccountModel  update(Account account , String userId) throws Exception;

    AccountModel login (Account account) throws  Exception;


    AccountModel getUserById(String userId);

    List<Account> getAccount(int page, int limit);

    long getCount();

    List<Account> getAccByName(int page, int limit, String name);
    void lockAcc(List<String> id);
}
