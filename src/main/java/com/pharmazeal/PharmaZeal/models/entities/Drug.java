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

    private String drugName;

    private String customer_condition;

    private boolean idCheck;

    private String store;

    private String postcode;

    private int available_stock;

    private double price;

    private String expiry_date;

    private boolean availability;

    @ManyToOne
    @JoinColumn(name="sale")
    private Sales sale;
}
