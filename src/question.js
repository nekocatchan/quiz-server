const db = await Deno.openKv();

export async function postQuestion(ctx) {
  // リクエストボディの取得
  const body = await ctx.request.body.json();

  // バリデーション
  const validationResult = validateQuestion(body);
  if (!validationResult.valid) {
    ctx.response.status = 200;
    ctx.response.body = { status: 400, error: validationResult.message };
    return;
  }

  // データの保存
  await db.set(["questions", body.questionId], body);

  ctx.response.status = 200;
  ctx.response.body = { status: 200 };
}

function validateQuestion(question) {
  // 必須項目の確認
  const requiredFields = [
    "questionId",
    "imageUrl",
    "choices",
    "correctChoiceId",
  ];
  const missingFields = requiredFields.filter((field) => !(field in question));
  if (missingFields.length > 0) {
    return {
      valid: false,
      message: `必須項目が欠けています: ${missingFields.join(", ")}`,
    };
  }

  // choicesが配列であるか、長さが4であるかを確認
  if (!Array.isArray(question.choices) || question.choices.length !== 4) {
    return {
      valid: false,
      message: "'choices' フィールドは配列で、要素が4つである必要があります。",
    };
  }

  // 各choiceがchoiceIdとtextを持つか確認
  for (const choice of question.choices) {
    if (
      typeof choice.choiceId !== "number" ||
      typeof choice.text !== "string"
    ) {
      return {
        valid: false,
        message:
          "各選択肢は 'choiceId'（数値）と 'text'（文字列）を持つ必要があります。",
      };
    }
  }

  // 全ての条件を満たしていれば有効
  return { valid: true };
}
