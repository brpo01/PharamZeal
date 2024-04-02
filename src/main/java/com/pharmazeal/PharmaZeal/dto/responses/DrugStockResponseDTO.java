package com.pharmazeal.PharmaZeal.dto.responses;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class DrugStockResponseDTO {

    private final int id;

    private final String drug_code;

    private final String drugName;

    private final int available_stock;

    private final String expiry_date;
}
