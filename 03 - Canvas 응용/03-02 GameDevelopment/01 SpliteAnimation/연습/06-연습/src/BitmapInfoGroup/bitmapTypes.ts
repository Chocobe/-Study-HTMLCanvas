const BITMAP = "bitmap";

// Player 정보
const BITMAP_PLAYER = `${BITMAP}_player`;
export const BITMAP_PLAYER_IDLE = `${BITMAP_PLAYER}_idle`;
export const BITMAP_PLAYER_JUMP = `${BITMAP_PLAYER}_jump`;
export const BITMAP_PLAYER_FALL = `${BITMAP_PLAYER}_fall`;
export const BITMAP_PLAYER_RUN = `${BITMAP_PLAYER}_run`;
export const BITMAP_PLAYER_DIZZY = `${BITMAP_PLAYER}_dizzy`;
export const BITMAP_PLAYER_SIT = `${BITMAP_PLAYER}_sit`;
export const BITMAP_PLAYER_ROLL = `${BITMAP_PLAYER}_roll`;
export const BITMPA_PLAYER_BITE = `${BITMAP_PLAYER}_bite`;
export const BITMAP_PLAYER_KO = `${BITMAP_PLAYER}_ko`;
export const BITMAP_PLAYER_GET_HIT = `${BITMAP_PLAYER}_getHit`;

const extractBitmapKey = (
  parentType: string,
  targetType: string
) => {
  const key = targetType.replace(`${parentType}_`, "");

  if (key === targetType) {
    throw new Error("targetType 은 parentType 과 연관되지 않았습니다.");
  }

  return key;
}

export const extractPlayerStateKey = (
  playerBitmapType: string
) => {
  return extractBitmapKey(
    BITMAP_PLAYER,
    playerBitmapType
  );
};