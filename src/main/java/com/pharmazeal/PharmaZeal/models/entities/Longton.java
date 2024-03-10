package com.pharmazeal.PharmaZeal.models.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="longton")
public class Longton {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String date_of_birth;

    private String surname;

    private String middle_name;

    private String firstname;

    private int house_number;

    private String street_name;

    private String postcode;

    private String city;

    private String county;

    private String country;

}
