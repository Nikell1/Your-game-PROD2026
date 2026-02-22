export type THostEvents =
  // === НАЧАЛО ИГРЫ ===
  | "game_started" // Игра началась

  // === РАУНДЫ ===
  | "round_1_start" // Начало первого раунда
  | "round_2_start" // Начало второго раунда
  | "final_round_start" // Начало финального раунда
  | "general_round_end" // Раунд завершён (все вопросы отвечены)

  // === ТАБЛИЦА ВОПРОСОВ ===
  | "question_table_open" // Таблица вопросов открыта
  | "question_selected" // Выбран вопрос (любой тип)
  | "question_answered" // Вопрос отвечен (независимо от результата)

  // === ОБЫЧНЫЙ ВОПРОС ===
  | "regular_question_open" // Открыт обычный вопрос
  | "regular_question_answer_start" // Начало ответа на обычный вопрос
  | "regular_correct_answer" // Правильный ответ на обычный вопрос
  | "regular_incorrect_answer" // Неправильный ответ на обычный вопрос
  | "regular_timeout" // Время вышло на обычном вопросе
  | "all_players_incorrect"

  // === КОТ В МЕШКЕ ===
  | "cat_in_bag_open" // Открыт кот в мешке
  | "cat_in_bag_modal" // Показана модалка выбора игрока для кота
  | "cat_in_bag_player_selected" // Выбран игрок для кота
  | "cat_in_bag_answer_start" // Выбранный игрок отвечает на вопрос кота
  | "cat_in_bag_correct" // Правильный ответ на кота
  | "cat_in_bag_incorrect" // Неправильный ответ на кота

  // === АУКЦИОН ===
  | "auction_open" // Открыт аукцион
  | "auction_modal" // Показана модалка аукциона
  | "auction_bet_placed" // Сделана ставка (кем)
  | "auction_bet_all" // Игрок поставил ва-банк
  | "auction_pass" // Игрок спасовал
  | "auction_winner" // Определён победитель аукциона
  | "auction_question_start" // Победитель отвечает на вопрос аукциона
  | "auction_correct_answer" // Правильный ответ на аукционе
  | "auction_incorrect_answer" // Неправильный ответ на аукционе

  // === ФИНАЛЬНЫЙ РАУНД ===
  | "final_round_start" // Начало финала (до ставок, побуждение делать ставки)
  | "final_bet_placed" // Игрок сделал ставку, очередь другого
  | "final_all_bets_placed" // Все игроки сделали ставки
  | "final_player_turn" // Очередь конкретного игрока в финале
  | "final_answer_start" // Игрок начал отвечать
  | "final_entered_answer" // игрок ввёл ответ в финале
  | "final_results" // Показаны результаты финала

  // === ИГРОКИ ===
  | "player_selected" // Игрок выбран (клавишей или мышью), это происходит на обычных вопросах, реакции будут примерно - Игрок, ваша версия?

  // === ТАЙМЕР ===
  | "timer_warning" // Осталось мало времени (10 секунд)
  | "timer_expired" // Время вышло

  // === ЗАВЕРШЕНИЕ ===
  | "game_results"; // Показаны итоговые результаты

export interface IHostPhrase {
  id: string;
  eventType: THostEvents;
  label: string;
}
