package org.example.shop.utils;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Response <T>{
    private  long count;
    private  T data;
    private  String message;


    public Response(T data, String message) {
        this.data = data;
        this.message = message;
    }
}
