package com.pharmazeal.PharmaZeal.models.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="drug")

public class Drug {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String drug_code;

    private String drug_name;

    private String condition;

    private boolean id_check;

    private String store;

    private String postcode;

    private String available_stock;

    private String price;

    private String expiry_date;

    private boolean is_available;

    @OneToMany(mappedBy="drug")
    @OrderBy(value="id")
    private List<Sales> sales = new ArrayList<>();
}
