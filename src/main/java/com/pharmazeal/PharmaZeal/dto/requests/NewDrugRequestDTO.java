package com.pharmazeal.PharmaZeal.dto.requests;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.Past;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class NewDrugRequestDTO {

    @NotBlank(message = "Drug Code cannot be blank")
    private String drug_code;

    @NotBlank(message = "Drug name cannot be blank")
    private String drugName;

    @NotBlank(message = "condition cannot be blank")
    private String customer_condition;

    private boolean id_check;

    @NotBlank(message = "store cannot be blank")
    private String store;

    @NotBlank(message = "postcode cannot be blank")
    private String postcode;

    @Min(value=0, message = "Stock must be at least zero.")
    private int available_stock;

    @Min(value=0, message = "Price must be at least zero.")
    private double price;

    @NotBlank(message = "Availability cannot be blank")
    private String expiry_date;

    private boolean availability;

}
