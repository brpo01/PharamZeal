package com.pharmazeal.PharmaZeal.models.repositories;

import com.pharmazeal.PharmaZeal.models.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {
    Store findById(int id);
}
