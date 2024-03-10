package com.pharmazeal.PharmaZeal.dto.responses;

import lombok.*;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class DefaultResponseDTO {

    private int statusCode;

    private String message;

    private Object data;


    public DefaultResponseDTO(int statusCode, String message){
        this.statusCode = statusCode;
        this.message = message;
    }
}
