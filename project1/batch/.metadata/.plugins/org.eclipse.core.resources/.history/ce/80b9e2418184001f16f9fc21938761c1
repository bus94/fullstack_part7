package com.ss.batch.entity;

import java.time.LocalDateTime;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@MappedSuperclass
@Data
// 엔티티가 생성되거나 수정될 때 자동으로 생성일, 수정일을 기록할 수 있도록 필요한 작업을 수행 후 기록해준다.
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity { // BaseEntity는 테이블을 생성하지 않고 상속받은 엔티티 테이블 밑에 컬럼을 가지고 가서 생성할 수 있도록 도와주는 추상클래스
	// 엔티티 생성 시 실행
	@CreatedDate
	@Column(name = "create_at", nullable = false, updatable = false)
	private LocalDateTime creatAt;
	
	@LastModifiedDate
	@Column(name = "modified_at", nullable = false)
	// 업데이트 할 때만 실행
	private LocalDateTime modifiedAt;
}
