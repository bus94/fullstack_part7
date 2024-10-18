package com.ss.batch.entity;

public enum PassStatus {
	// 상태값들을 저장하는 것
	// READY, PROGRESSED, EXPIRED
	// JPA에서 enum 숫자로 자동 저장되도록 설정
	READY, PROGRESSED, EXPIRED;
}
