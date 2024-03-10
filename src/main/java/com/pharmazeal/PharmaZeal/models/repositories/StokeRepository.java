package com.pharmazeal.PharmaZeal.models.repositories;

import com.pharmazeal.PharmaZeal.models.entities.Stoke;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StokeRepository extends JpaRepository<Stoke, Integer> {
    Stoke findById(int id);
}
