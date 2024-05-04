package com.pharmazeal.PharmaZeal.dto.requests;


import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import javax.validation.constraints.FutureOrPresent;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class NewSaleRequestDTO {

    @Min(value = 1, message = "Id must be greater than zero")
    private int customerId;

    @Min(value = 1, message = "Id must be greater than zero")
    private int userId;

    @Min(value = 0, message = "Id must be greater than zero")
    private int quantity;

    @Min(value = 0, message = "Id must be greater than zero")
    private double total_price;

    @Min(value = 1, message = "Id must be greater than zero")
    private int storeId;

    @Size(min=1, max=10)
    private List<Integer> drugId;

    @FutureOrPresent(message = "Address cannot be blank")
    private LocalDate date_of_sale;
}
