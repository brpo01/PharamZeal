package com.pharmazeal.PharmaZeal.dto.responses;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class DrugResponseDTO {

    private final int id;

    private final String drug_code;

    private final String drugName;

    private final String customer_condition;

    private final boolean id_check;

    private final String store;

    private final String postcode;

    private final int available_stock;

    private final double price;

    private final String expiry_date;

    private final boolean availability;

    private List<SalesResponseDTO> sales;

}
