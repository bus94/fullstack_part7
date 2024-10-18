package com.ss.batch.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ss.batch.entity.PackageEntity;

public interface PackageRepository extends JpaRepository<PackageEntity, Long>{
	List<PackageEntity> findByCreatedAtAfter(LocalDateTime dateTime, PageRequest page);
}
