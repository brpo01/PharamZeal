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
public class NewDrugStockRequestDTO {

    @NotBlank(message = "Drug Code cannot be blank")
    private String drug_code;

    @NotBlank(message = "Drug name cannot be blank")
    private String drugName;

    @Min(value=0, message = "Stock must be at least zero.")
    private int total_stock;

    @NotBlank(message = "Availability cannot be blank")
    private String expiry_date;

}
