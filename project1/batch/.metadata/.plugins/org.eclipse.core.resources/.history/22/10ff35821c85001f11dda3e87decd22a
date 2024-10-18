package com.ss.batch.job.pass;

import java.time.LocalDateTime;
import java.util.Map;

import javax.persistence.EntityManagerFactory;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JpaCursorItemReader;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.builder.JpaCursorItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ss.batch.entity.PassEntity;
import com.ss.batch.entity.PassStatus;

// 이용권이 만료 되었을 때 배치 작업을 설정하는 클래스
@Configuration
public class ExpiredPassJobConfig {
	// 데이터를 한꺼번에 처리할 수 있는 사이즈
	private final int CHUNK_SIZE = 5;

	// JOB을 생성하는 팩토리(클래스)를 생성한다.
	private final JobBuilderFactory jobBuilderFactory;

	// Step을 생성하는 팩토리 (배치 작업의 단계)
	private final StepBuilderFactory stepBuilderFactory;

	// JPA와 DB를 연결 관리하는 객체
	private final EntityManagerFactory entityManagerFactory;

	public ExpiredPassJobConfig(JobBuilderFactory jobBuilderFactory, StepBuilderFactory stepBuilderFactory,
			EntityManagerFactory entityManagerFactory) {
		this.jobBuilderFactory = jobBuilderFactory;
		this.stepBuilderFactory = stepBuilderFactory;
		this.entityManagerFactory = entityManagerFactory;
	}

	// JOB
	// 배치 작업을 말하고 여러 개의 step(단계)을 가질 수 있다.
	// 실행 시 여러 step 순서대로 처리를 한다.
	@Bean
	public Job expiredPassJob() {
		return this.jobBuilderFactory.get("expiredPassJob") // 배치 작성을 생성해서 이름을 저장
				.start(expiredPassStep()) // step을 실행하는 메서드
				.build(); // JOB을 생성한다.
	}

	// STEP
	// <PassEntity, PassEntity> 입력, 출력 데이터 타입
	// 첫번째 제네릭 타입 - DB에서 데이터를 읽어올 때 타입
	// 두번째 제네릭 타입 - DB에서 데이터를 처리하거나, 수정된 데이터나 추가된 데이터를 저장
	@Bean
	public Step expiredPassStep() {
		return this.stepBuilderFactory.get("expiredPassStep").<PassEntity, PassEntity>chunk(CHUNK_SIZE)
				.reader(expiredPassItemReader()) // 읽어오기
				.processor(expiredPassItemProcessor()) // 데이터를 처리
				.writer(expiredPassItemWriter()) // 저장
				.build();
	}

	/*
	 * JpaCursorItemReader - JpaPagingItemReader만 지원했는데, Spring 4.3에서 추가된 페이징 기법보다
	 * 높은 성능으로 데이터 변경에 무관한 무결성 조회 가능하다.
	 * 
	 * Map.of() - java의 Map 객체를 자동으로 생성하는 것! (객체)
	 */
	@Bean
	@StepScope // step 실행 될 때마다 새로운 객체를 생성하도록 설정하는 어노테이션
	public JpaCursorItemReader<PassEntity> expiredPassItemReader() {
		return new JpaCursorItemReaderBuilder<PassEntity>().name("expiredPassItemReader") // ItemReader 여러 개 중 리더를 구분
				.entityManagerFactory(entityManagerFactory) // JPA를 통해서 DB에 연결하고 DB 관리
				// 상태(status)가 진행 중(PROGRESSED)이며, 종료일시(endedAt)가 현재 시점보다 과거일 경우 만료 대상
				// JPQL 쿼리
				.queryString("select p from PassEntity p where p.status = :status and p.ended_at <= :endedAt")
				.parameterValues(Map.of("status", PassStatus.PROGRESSED, "endedAt", LocalDateTime.now())).build();
	}

	@Bean
	public ItemProcessor<PassEntity, PassEntity> expiredPassItemProcessor() {
		// 인터페이스를 이용해서 itemProcessor 생성
		// 익명 클래스를 이용해서 사용한다. 람다식으로 표현.
		return new ItemProcessor<PassEntity, PassEntity>() {
			@Override
			public PassEntity process(PassEntity item) throws Exception {
				// 실제 처리하는 내용
				// 상태 현재 이용 중에서 만료!
				// 만료 일자도 현재 날짜를 기준으로 수정
				item.setStatus(PassStatus.EXPIRED);
				item.setExpired_at(LocalDateTime.now());
				return item;
			}
		};
	}
	// 위의 코드를 람다식으로 표현한 경우
//	@Bean
//	public ItemProcessor<PassEntity, PassEntity> expirePassesItemProcessor() {
//		return passEntity -> {
//			passEntity.setStatus(PassStatus.EXPIRED);
//			passEntity.setExpired_at(LocalDateTime.now());
//			return passEntity;
//		};
//	}
	
	@Bean
	public JpaItemWriter<PassEntity> expiredPassItemWriter() {
		JpaItemWriter<PassEntity> writer = new JpaItemWriter<PassEntity>();
		writer.setEntityManagerFactory(entityManagerFactory);
		return writer;
	}
}
