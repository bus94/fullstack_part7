package com.ss.batch.entity;

import java.time.LocalDateTime;

import javax.persistence.*;

import lombok.*;

// 대량 이용권
//  다수의 이용자에게 이용권을 지급
@Data
@Entity
@Table(name = "bulk_pass")
public class BulkPassEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bulkPassSeq;			// 대량 이용권 순번
	private Integer packageSeq;			// 패키지 순번
	private String userGroupId;			// 사용자 그룹 ID
	
	@Enumerated(EnumType.STRING)
	private BulkPassStatus status;		// 상태
	private Integer count;				// 이용권 수
	
	private LocalDateTime startedAt;	// 시작일
	private LocalDateTime endedAt;		// 종료일
}
