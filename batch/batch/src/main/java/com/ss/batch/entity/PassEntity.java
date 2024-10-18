package com.ss.batch.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

// 이용권 만료할 때 이용권 순번, 패키지 순번, 사용자 아이디
// 상태 잔여이용권 수, NULL인 경우 무제한
// 시작 일시, 종료 일시 NULL인 경우 무제한
// 만료일자, 생성 일시, 수정 일시
@Entity
@Data
@Table(name = "pass")
public class PassEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "pass_seq")
	private Long pass_seq; // 이용권 순번
	private Long package_seq;
	private String user_id;
	
	// 열거형 enum 쓸 때 DB에 저장할 때는 문자열로 저장 될 수 있도록 어노테이션을 사용한다.
	@Enumerated(EnumType.STRING)
	private PassStatus status;
//	private String status; // READY, PROGRESSED, EXPIRED
	
	private Integer remaining_count;
	private LocalDateTime started_at;
	private LocalDateTime ended_at;
	private LocalDateTime expired_at; // 만료일자
//	private LocalDateTime created_at;
//	private LocalDateTime modified_at;
}
